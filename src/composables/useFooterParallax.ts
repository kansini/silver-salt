import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue';
import { gsap, ScrollTrigger } from '../lib/motion';
import { useSitePreferences } from './useSitePreferences';

export function useFooterParallax(
    download: Ref<HTMLElement | undefined>,
    footerMedia: Ref<HTMLElement | undefined>,
    frame: Ref<HTMLElement | undefined>,
) {
    const { reducedMotion } = useSitePreferences();
    let context: gsap.Context | undefined;
    function setupFooterParallax() {
        context?.revert();
        if (!footerMedia.value || !download.value || !frame.value || reducedMotion.value)
            return;
        context = gsap.context(() => {
            const trigger = {
                trigger: download.value,
                start: 'top bottom', end: 'bottom top', scrub: .6,
                invalidateOnRefresh: true,
            };
            gsap.fromTo(footerMedia.value!, {
                y: () => -(download.value?.offsetHeight ?? 0) * .2,
            }, {
                y: () => (download.value?.offsetHeight ?? 0) * .2,
                ease: 'none', scrollTrigger: trigger,
            });
            // The frame travels against the background, while copy stays still.
            gsap.fromTo(frame.value!, {
                y: () => (download.value?.offsetHeight ?? 0) * .16,
            }, {
                y: () => -(download.value?.offsetHeight ?? 0) * .16,
                ease: 'none', scrollTrigger: { ...trigger },
            });
            gsap.fromTo(frame.value!, { opacity: 0 }, {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    ...trigger,
                    end: 'top 20%',
                },
            });
        }, download.value);
    }
    onMounted(() => { setupFooterParallax(); ScrollTrigger.refresh(); });
    watch(reducedMotion, setupFooterParallax);
    onBeforeUnmount(() => context?.revert());
}
