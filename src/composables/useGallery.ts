import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import { gallery } from '../gallery';
import { gsap, ScrollTrigger } from '../lib/motion';
import type { GalleryFilter } from '../types/gallery';
import { useSitePreferences } from './useSitePreferences';
export function useGallery(archive: Ref<HTMLElement | undefined>, closeViewer: () => void) {
    const { reducedMotion } = useSitePreferences();
    const filter = ref<GalleryFilter>('all');
    const activeIndex = ref(0);
    const filtered = computed(() => gallery.filter(item => filter.value === 'all' || item.type === filter.value));
    const active = computed(() => filtered.value[activeIndex.value] ?? filtered.value[0]!);
    const nearby = computed(() => {
        const start = Math.max(0, Math.min(activeIndex.value - 2, filtered.value.length - 5));
        return filtered.value.slice(start, start + 5).map((item, i) => ({ item, index: start + i }));
    });
    const filters: {
        id: GalleryFilter;
        zh: string;
        en: string;
    }[] = [
        { id: 'all', zh: '全部', en: 'All works' }, { id: 'photo', zh: '照片', en: 'Photos' }, { id: 'video', zh: '视频', en: 'Films' },
    ];
    let animation: gsap.core.Tween | undefined;
    let observer: ResizeObserver | undefined;
    let refreshTimer: gsap.core.Tween | undefined;
    const progress = { value: 0 };
    function photoOrigin(index: number) {
        const card = archive.value?.querySelectorAll<HTMLElement>('.work-card')[index];
        const image = card?.querySelector('img');
        if (!card || !image || card.style.visibility === 'hidden')
            return null;
        const rect = image.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight)
            return null;
        // object-fit:contain leaves empty space inside the thumbnail element.
        const item = filtered.value[index]!;
        const fit = Math.min(image.offsetWidth / item.width, image.offsetHeight / item.height);
        const scale = Number(gsap.getProperty(card, 'scaleX')) || 1;
        const width = item.width * fit * scale;
        const height = item.height * fit * scale;
        return {
            rect: { left: rect.left + (rect.width - width) / 2, top: rect.top + (rect.height - height) / 2, width, height },
            rotation: Number(gsap.getProperty(card, 'rotation')) || 0,
            image,
        };
    }
    function renderCards() {
        if (!archive.value)
            return;
        const current = Math.round(progress.value);
        if (activeIndex.value !== current)
            activeIndex.value = current;
        const height = archive.value?.querySelector('.gallery-stage')?.clientHeight ?? window.innerHeight;
        archive.value.querySelectorAll<HTMLElement>('.work-card').forEach((card, i) => {
            const distance = i - (reducedMotion.value ? current : progress.value);
            const show = Math.abs(distance) < (reducedMotion.value ? .5 : 1.7);
            card.style.visibility = show ? 'visible' : 'hidden';
            gsap.set(card, {
                y: distance * height * (window.innerWidth > 760 ? .62 : .77),
                x: reducedMotion.value ? 0 : Math.sin(distance * 1.6) * (window.innerWidth > 760 ? 50 : 18),
                rotation: reducedMotion.value ? 0 : distance * -8,
                scale: 1 - Math.min(Math.abs(distance), 2) * .12,
                opacity: show ? 1 : 0,
                zIndex: 10 - Math.round(Math.abs(distance) * 3),
            });
        });
    }
    function setupGallery() {
        animation?.scrollTrigger?.kill();
        animation?.kill();
        progress.value = 0;
        activeIndex.value = 0;
        renderCards();
        if (!archive.value)
            return;
        animation = gsap.to(progress, {
            value: filtered.value.length - 1,
            ease: 'none',
            scrollTrigger: {
                trigger: archive.value, start: 'top top', end: 'bottom bottom', scrub: reducedMotion.value ? true : .6,
                invalidateOnRefresh: true, onRefresh: renderCards,
            },
            onUpdate: renderCards,
        });
        ScrollTrigger.refresh();
    }
    async function setFilter(value: GalleryFilter) {
        if (value === filter.value)
            return;
        closeViewer();
        filter.value = value;
        await nextTick();
        setupGallery();
        window.scrollTo({ top: archive.value?.offsetTop ?? 0, behavior: 'instant' });
    }
    function goTo(index: number) {
        if (index < 0 || index >= filtered.value.length)
            return;
        const trigger = animation?.scrollTrigger;
        if (!trigger)
            return;
        const target = trigger.start + (trigger.end - trigger.start) * index / Math.max(1, filtered.value.length - 1);
        window.scrollTo({ top: target, behavior: reducedMotion.value ? 'instant' : 'smooth' });
    }
    watch(reducedMotion, renderCards);
    onMounted(async () => {
        await nextTick();
        setupGallery();
        observer = new ResizeObserver(() => {
            renderCards();
            refreshTimer?.kill();
            refreshTimer = gsap.delayedCall(.15, () => ScrollTrigger.refresh());
        });
        if (archive.value)
            observer.observe(archive.value);
    });
    onBeforeUnmount(() => {
        animation?.scrollTrigger?.kill();
        animation?.kill();
        observer?.disconnect();
        refreshTimer?.kill();
    });
    return { filter, activeIndex, filtered, active, nearby, filters, setFilter, goTo, photoOrigin };
}
