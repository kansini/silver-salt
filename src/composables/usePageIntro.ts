import { nextTick, onBeforeUnmount, onMounted, type Ref } from 'vue';
import { gsap } from '../lib/motion';
export function usePageIntro(root: Ref<HTMLElement | undefined>, reducedMotion: Readonly<Ref<boolean>>) {
    let intro: gsap.Context | undefined;
    onMounted(async () => {
        await nextTick();
        if (!root.value || reducedMotion.value)
            return;
        intro = gsap.context(() => {
            gsap.from('.masthead, .gallery-meta, .work-info, .gallery-bottom', { opacity: 0, y: 12, duration: .8, stagger: .1, ease: 'power2.out' });
            gsap.from('.work-image', { opacity: 0, duration: 1.2, ease: 'power2.out' });
        }, root.value);
    });
    onBeforeUnmount(() => intro?.revert());
}
