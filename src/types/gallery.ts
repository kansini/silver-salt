export type GalleryFilter = 'all' | 'photo' | 'video';
/** Painted thumbnail bounds used by the fullscreen entrance/exit animation. */
export interface PhotoOrigin {
    rect: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    rotation: number;
    image: HTMLImageElement;
}
