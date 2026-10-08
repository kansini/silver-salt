import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue';
import { gsap, ScrollTrigger } from '../lib/motion';
import { useSitePreferences } from './useSitePreferences';
export function useFooterParallax(download: Ref<HTMLElement | undefined>, footerMedia: Ref<HTMLElement | undefined>) {
    const { reducedMotion } = useSitePreferences();
    let footerParallax: gsap.core.Tween | undefined;
    function setupFooterParallax() {
        footerParallax?.scrollTrigger?.kill();
        footerParallax?.kill();
        if (!footerMedia.value || !download.value)
            return;
        gsap.set(footerMedia.value, { clearProps: 'transform' });
        if (reducedMotion.value)
            return;
        footerParallax = gsap.fromTo(footerMedia.value, { y: () => -(download.value?.offsetHeight ?? 0) * .12 }, {
            y: () => (download.value?.offsetHeight ?? 0) * .12,
            ease: 'none',
            scrollTrigger: {
                trigger: download.value, start: 'top bottom', end: 'bottom top', scrub: .6,
                invalidateOnRefresh: true,
            },
        });
    }
    onMounted(() => { setupFooterParallax(); ScrollTrigger.refresh(); });
    watch(reducedMotion, setupFooterParallax);
    onBeforeUnmount(() => { footerParallax?.scrollTrigger?.kill(); footerParallax?.kill(); });
}
