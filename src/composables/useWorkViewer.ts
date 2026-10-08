import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { GalleryItem } from '../gallery';
import { gsap } from '../lib/motion';
import type { PhotoOrigin } from '../types/gallery';
import { useSitePreferences } from './useSitePreferences';
interface ViewerOptions {
    items: () => readonly GalleryItem[];
    activeIndex: () => number;
    getPhotoOrigin: (index: number) => PhotoOrigin | null;
}
/** Owns the modal, media playback, and cancellable GSAP entrance/navigation/exit timelines. */
export function useWorkViewer(options: ViewerOptions) {
    const { reducedMotion, visible } = useSitePreferences();
    const dialog = ref<HTMLDialogElement>();
    const viewerVideo = ref<HTMLVideoElement>();
    function setViewerVideo(element: unknown) { viewerVideo.value = element instanceof HTMLVideoElement ? element : undefined; }
    const viewerIndex = ref<number | null>(null);
    const viewing = computed(() => viewerIndex.value === null ? null : options.items()[viewerIndex.value] ?? null);
    let viewerScrollPosition = 0;
    let viewerMotion: gsap.core.Timeline | undefined;
    let viewerMotionVersion = 0;
    let viewerClosing = false;
    let expectedViewerCloses = 0;
    let viewerSourceImage: HTMLImageElement | undefined;
    const viewerPhotoSource = ref('');
    const viewerSwitching = ref(false);
    watch(viewing, async (item) => {
        if (item?.type !== 'photo')
            return;
        viewerPhotoSource.value = item.preview;
        const image = new Image();
        image.src = item.src;
        try {
            await image.decode();
            if (viewing.value === item && !viewerClosing)
                viewerPhotoSource.value = item.src;
        }
        catch { /* Keep the lightweight preview if the original cannot load. */ }
    });
    function resetViewerMotion() {
        viewerMotion?.kill();
        viewerMotion = undefined;
        viewerSwitching.value = false;
        if (!dialog.value)
            return;
        gsap.set(dialog.value.querySelectorAll('.viewer-surface, .viewer-header, .viewer-footer, .viewer-media, .viewer-header > span, .viewer-footer > p, .viewer-media img, .viewer-media video'), { clearProps: 'transform,opacity' });
    }
    function photoTransform(image: Element, origin: PhotoOrigin) {
        const rect = image.getBoundingClientRect();
        return {
            x: origin.rect.left + origin.rect.width / 2 - rect.left - rect.width / 2,
            y: origin.rect.top + origin.rect.height / 2 - rect.top - rect.height / 2,
            scaleX: origin.rect.width / rect.width,
            scaleY: origin.rect.height / rect.height,
            rotation: origin.rotation,
        };
    }
    async function openViewer(index: number) {
        if (viewerIndex.value !== null)
            return;
        const origin = options.items()[index]?.type === 'photo' ? options.getPhotoOrigin(index) : null;
        const version = ++viewerMotionVersion;
        viewerScrollPosition = window.scrollY;
        viewerClosing = false;
        viewerIndex.value = index;
        await nextTick();
        if (version !== viewerMotionVersion || !dialog.value || viewerIndex.value === null)
            return;
        resetViewerMotion();
        const media = dialog.value.querySelector('.viewer-media img, .viewer-media video');
        const surface = dialog.value.querySelector('.viewer-surface');
        const chrome = dialog.value.querySelectorAll('.viewer-header, .viewer-footer');
        // Set hidden styles before entering the top layer to avoid a single-frame flash.
        if (!reducedMotion.value) {
            if (surface)
                gsap.set(surface, { opacity: 0 });
            gsap.set(chrome, { opacity: 0 });
        }
        dialog.value.showModal();
        playViewerVideo();
        if (reducedMotion.value || !media)
            return;
        if (origin) {
            viewerSourceImage = origin.image;
            gsap.set(viewerSourceImage, { opacity: 0 });
        }
        viewerMotion = gsap.timeline({ onComplete: resetViewerMotion })
            .to(surface, { opacity: 1, duration: .38, ease: 'power2.out' }, 0)
            .fromTo(media, origin ? photoTransform(media, origin) : { scale: .94, y: 18, opacity: 0 }, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1, duration: .55, ease: 'power3.inOut' }, 0)
            .fromTo(chrome, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .28, stagger: .04, ease: 'power2.out' }, .22);
    }
    function finishViewer() {
        const wasViewing = viewerIndex.value !== null;
        ++viewerMotionVersion;
        resetViewerMotion();
        viewerVideo.value?.pause();
        if (viewerSourceImage)
            gsap.set(viewerSourceImage, { clearProps: 'opacity' });
        viewerSourceImage = undefined;
        if (dialog.value?.open) {
            expectedViewerCloses++;
            dialog.value.close();
        }
        viewerIndex.value = null;
        viewerClosing = false;
        if (wasViewing)
            window.scrollTo({ top: viewerScrollPosition, behavior: 'instant' });
    }
    function closeViewer() {
        if (viewerIndex.value === null || viewerClosing)
            return;
        viewerClosing = true;
        ++viewerMotionVersion;
        viewerVideo.value?.pause();
        viewerMotion?.kill();
        if (reducedMotion.value || !dialog.value?.open) {
            finishViewer();
            return;
        }
        const media = dialog.value.querySelector('.viewer-media img, .viewer-media video');
        const origin = viewing.value?.type === 'photo' && viewerIndex.value === options.activeIndex() ? options.getPhotoOrigin(viewerIndex.value) : null;
        // Measure the untransformed fullscreen image even when closing during its entrance.
        const transform = media && origin ? (() => {
            const previous = Object.fromEntries(['x', 'y', 'scaleX', 'scaleY', 'rotation', 'opacity'].map(property => [property, gsap.getProperty(media, property)]));
            gsap.set(media, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 });
            const target = photoTransform(media, origin);
            gsap.set(media, previous);
            return target;
        })() : { scale: .95, y: 12, opacity: 0 };
        viewerMotion = gsap.timeline({ onComplete: finishViewer })
            .to(dialog.value.querySelectorAll('.viewer-header, .viewer-footer'), { opacity: 0, y: 6, duration: .18, ease: 'power2.in' }, 0)
            .to(dialog.value.querySelector('.viewer-surface'), { opacity: 0, duration: .35, ease: 'power2.inOut' }, .04);
        if (media)
            viewerMotion.to(media, { ...transform, duration: .42, ease: 'power3.inOut' }, 0);
    }
    function nativeViewerClosed() {
        // Native close events are queued; an older event must not cancel a new opening.
        if (expectedViewerCloses > 0) {
            expectedViewerCloses--;
            return;
        }
        if (!dialog.value?.open)
            finishViewer();
    }
    async function swapViewer(target: number, direction: number, version: number) {
        if (version !== viewerMotionVersion || viewerClosing || viewerIndex.value === null)
            return;
        viewerVideo.value?.pause();
        const item = options.items()[target]!;
        if (item.type === 'photo')
            viewerPhotoSource.value = item.preview;
        viewerIndex.value = target;
        await nextTick();
        if (version !== viewerMotionVersion || viewerClosing || !dialog.value?.open)
            return;
        playViewerVideo();
        if (reducedMotion.value) {
            resetViewerMotion();
            return;
        }
        const content = dialog.value.querySelectorAll('.viewer-media, .viewer-header > span, .viewer-footer > p');
        viewerMotion = gsap.timeline({ onComplete: resetViewerMotion })
            .fromTo(content, { x: direction * 28, opacity: 0 }, { x: 0, opacity: 1, duration: .34, ease: 'power3.out' });
    }
    function changeViewer(direction: number) {
        if (viewerIndex.value === null || viewerClosing || viewerSwitching.value)
            return;
        const target = viewerIndex.value + direction;
        if (target < 0 || target >= options.items().length || !dialog.value?.open)
            return;
        resetViewerMotion();
        const version = ++viewerMotionVersion;
        if (reducedMotion.value) {
            void swapViewer(target, direction, version);
            return;
        }
        viewerSwitching.value = true;
        const content = dialog.value.querySelectorAll('.viewer-media, .viewer-header > span, .viewer-footer > p');
        viewerMotion = gsap.timeline({ onComplete: () => { void swapViewer(target, direction, version); } })
            .to(content, { x: direction * -24, opacity: 0, duration: .18, ease: 'power2.in' });
    }
    function viewerKeys(event: KeyboardEvent) {
        if (event.target instanceof HTMLVideoElement)
            return;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changeViewer(-1);
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            changeViewer(1);
        }
    }
    function playViewerVideo() {
        const video = viewerVideo.value;
        if (!video)
            return;
        if (document.hidden || viewerClosing || !dialog.value?.open) {
            video.pause();
            return;
        }
        void video.play().catch(() => { });
    }
    watch(visible, value => { if (value)
        playViewerVideo();
    else
        viewerVideo.value?.pause(); });
    watch(reducedMotion, value => {
        if (value) {
            if (viewerClosing)
                finishViewer();
            else
                resetViewerMotion();
        }
    });
    onBeforeUnmount(() => {
        ++viewerMotionVersion;
        resetViewerMotion();
        viewerVideo.value?.pause();
        dialog.value?.close();
        if (viewerSourceImage)
            gsap.set(viewerSourceImage, { clearProps: 'opacity' });
    });
    return { dialog, setViewerVideo, viewerIndex, viewing, viewerPhotoSource, viewerSwitching, openViewer, finishViewer, closeViewer, nativeViewerClosed, changeViewer, viewerKeys, playViewerVideo };
}
