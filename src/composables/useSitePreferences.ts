import { inject, nextTick, onBeforeUnmount, onMounted, provide, readonly, ref, watch, type InjectionKey, type Ref } from 'vue';
import { ScrollTrigger } from '../lib/motion';
type Language = 'zh' | 'en';
type Theme = 'light' | 'dark';
interface SitePreferences {
    language: Ref<Language>;
    theme: Ref<Theme>;
    reducedMotion: Readonly<Ref<boolean>>;
    visible: Readonly<Ref<boolean>>;
    t: (zh: string, en: string) => string;
}
const preferencesKey: InjectionKey<SitePreferences> = Symbol('site-preferences');
function saved(key: string) { try {
    return localStorage.getItem(key);
}
catch {
    return null;
} }
function save(key: string, value: string) { try {
    localStorage.setItem(key, value);
}
catch { /* Storage is optional. */ } }
/** The page root owns browser preferences and listeners; children share the same state. */
export function provideSitePreferences() {
    const language = ref<Language>(saved('silver-salt-language') === 'en' ? 'en' : 'zh');
    const theme = ref<Theme>(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedMotion = ref(media.matches);
    const visible = ref(!document.hidden);
    const t = (zh: string, en: string) => language.value === 'zh' ? zh : en;
    watch(theme, value => {
        document.documentElement.dataset.theme = value;
        save('silver-salt-theme', value);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#1b1c1a' : '#edede9');
    }, { immediate: true });
    watch(language, async (value) => {
        document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en';
        save('silver-salt-language', value);
        document.title = t('银盐', 'Silver Salt');
        const description = t('用银盐拍摄的照片与视频作品。让光影、纸张与记忆，在时光里显影。', 'Photos and films captured with Silver Salt. An everyday archive of light, paper and memory.');
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
        await nextTick();
        ScrollTrigger.refresh();
    }, { immediate: true });
    function motionChanged(event: MediaQueryListEvent) { reducedMotion.value = event.matches; }
    function visibilityChanged() { visible.value = !document.hidden; }
    onMounted(() => {
        media.addEventListener('change', motionChanged);
        document.addEventListener('visibilitychange', visibilityChanged);
    });
    onBeforeUnmount(() => {
        media.removeEventListener('change', motionChanged);
        document.removeEventListener('visibilitychange', visibilityChanged);
    });
    const preferences: SitePreferences = { language, theme, t, reducedMotion: readonly(reducedMotion), visible: readonly(visible) };
    provide(preferencesKey, preferences);
    return preferences;
}
export function useSitePreferences() {
    const preferences = inject(preferencesKey);
    if (!preferences)
        throw new Error('Site preferences must be provided by the page root.');
    return preferences;
}
