import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useSitePreferences } from './useSitePreferences';

const duration = 600;

/** A scalloped ink edge, always large enough to reach every viewport corner. */
function inkFrames(x: number, y: number) {
    const reach = Math.max(...[[0, 0], [innerWidth, 0], [0, innerHeight], [innerWidth, innerHeight]]
        .map(([cx, cy]) => Math.hypot(cx! - x, cy! - y)));
    return [0, .025, .09, .21, .39, .62, .88, 1.16, 1.48].map((scale, step) => {
        const points = Array.from({ length: 120 }, (_, index) => {
            const angle = index / 120 * Math.PI * 2;
            const edge = 1 + .11 * Math.sin(angle * 5 + .4)
                + .065 * Math.sin(angle * 9 - .8) + .03 * Math.sin(angle * 17 + step * .12);
            const radius = reach * scale * edge;
            return `${(x + Math.cos(angle) * radius).toFixed(1)}px ${(y + Math.sin(angle) * radius).toFixed(1)}px`;
        });
        return { clipPath: `polygon(${points.join(',')})` };
    });
}

export function useThemeTransition() {
    const { theme, reducedMotion } = useSitePreferences();
    const transitioning = ref(false);
    let transition: ViewTransition | undefined;
    let animation: Animation | undefined;
    let overlay: HTMLDivElement | undefined;
    let commit: (() => void) | undefined;
    let disposed = false;
    let version = 0;

    function finish() {
        ++version;
        commit?.();
        commit = undefined;
        transition?.skipTransition();
        animation?.cancel();
        overlay?.remove();
        transition = undefined;
        animation = undefined;
        overlay = undefined;
        document.documentElement.classList.remove('theme-ink-transition');
        transitioning.value = false;
    }

    async function toggleTheme(event: MouseEvent) {
        if (transitioning.value)
            return;
        const run = ++version;
        const target = theme.value === 'light' ? 'dark' : 'light';
        if (reducedMotion.value) {
            theme.value = target;
            return;
        }
        const button = event.currentTarget as HTMLElement;
        const bounds = button.getBoundingClientRect();
        const frames = inkFrames(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        transitioning.value = true;
        commit = () => { theme.value = target; };
        try {
            if (typeof document.startViewTransition === 'function') {
                document.documentElement.classList.add('theme-ink-transition');
                transition = document.startViewTransition(async () => {
                    commit?.();
                    await nextTick();
                });
                // Avoid unhandled rejection if visibility/resize skips the snapshot.
                void transition.finished.catch(() => {});
                await transition.ready;
                if (disposed || run !== version || !transitioning.value)
                    return;
                animation = document.documentElement.animate(frames, {
                    duration, easing: 'cubic-bezier(.4, 0, .2, 1)',
                    fill: 'both', pseudoElement: '::view-transition-new(root)',
                });
                await animation.finished;
            } else {
                // Older WebViews still get a colored ink wash before the theme commits.
                overlay = document.createElement('div');
                overlay.className = 'theme-ink-overlay';
                overlay.setAttribute('aria-hidden', 'true');
                overlay.style.background = target === 'dark' ? '#1b1c1a' : '#edede9';
                document.body.append(overlay);
                animation = overlay.animate(frames, {
                    duration, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'both',
                });
                await animation.finished;
                commit?.();
                await nextTick();
                animation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, fill: 'both' });
                await animation.finished;
            }
        } catch {
            // A skipped/cancelled browser transition must still apply the user's choice.
        } finally {
            if (run === version)
                finish();
        }
    }
    watch(reducedMotion, value => { if (value && transitioning.value) finish(); });
    onBeforeUnmount(() => { disposed = true; finish(); });
    return { toggleTheme, transitioning };
}
