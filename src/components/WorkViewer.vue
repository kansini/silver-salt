<script setup lang="ts">
import { watch } from 'vue';
import AppIcon from './AppIcon.vue';
import type { GalleryItem } from '../gallery';
import type { PhotoOrigin } from '../types/gallery';
import { useWorkViewer } from '../composables/useWorkViewer';
import { useSitePreferences } from '../composables/useSitePreferences';
import { formatWorkNumber as number } from '../utils/format';
const props = defineProps<{
    items: readonly GalleryItem[];
    activeIndex: number;
    getPhotoOrigin: (index: number) => PhotoOrigin | null;
}>();
const emit = defineEmits<{
    'open-change': [
        open: boolean
    ];
}>();
const { language, t } = useSitePreferences();
const { dialog, setViewerVideo, viewerIndex, viewing, viewerPhotoSource, viewerSwitching, openViewer, finishViewer, closeViewer, nativeViewerClosed, changeViewer, viewerKeys, playViewerVideo } = useWorkViewer({
    items: () => props.items,
    activeIndex: () => props.activeIndex,
    getPhotoOrigin: index => props.getPhotoOrigin(index),
});
watch(() => viewerIndex.value !== null, open => emit('open-change', open));
defineExpose({ open: openViewer, finish: finishViewer });
</script>

<template>
  <dialog
    ref="dialog"
    class="work-viewer"
    :aria-label="t('作品全屏查看', 'Full-screen work viewer')"
    @cancel.prevent="closeViewer"
    @close="nativeViewerClosed"
    @keydown="viewerKeys"
    @click="event => { if (event.target === dialog) closeViewer() }"
  >
    <div key="viewer-surface" class="viewer-surface" aria-hidden="true">
    </div>
    <div v-if="viewing" key="viewer-content" class="viewer-content">
      <div class="viewer-header">
        <span>{{ number((viewerIndex ?? 0) + 1) }} / {{ number(items.length) }} — {{ viewing.title[language] }}</span>
        <button :aria-label="t('关闭作品', 'Close viewer')" @click="closeViewer">
          <AppIcon name="close" />
        </button>
      </div>
      <div class="viewer-media" :aria-busy="viewerSwitching" @click="closeViewer">
        <video
          v-if="viewing.type === 'video'"
          :ref="setViewerVideo"
          :key="viewing.id"
          :src="viewing.src"
          :poster="viewing.preview"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          :tabindex="-1"
          @loadeddata="playViewerVideo"
        >
        </video>
        <img
          v-else
          :key="viewing.id"
          :src="viewerPhotoSource || viewing.preview"
          :alt="viewing.title[language]"
          :width="viewing.width"
          :height="viewing.height"
        />
      </div>
      <div class="viewer-footer">
        <button
          :disabled="viewerSwitching || viewerIndex === 0"
          :aria-label="t('上一件作品', 'Previous work')"
          @click="changeViewer(-1)"
        >
          <AppIcon name="up" />
        </button>
        <p>{{ viewing.description[language] }}</p>
        <a :href="viewing.original ?? viewing.src" target="_blank" rel="noopener noreferrer">
          {{ t('原始作品', 'Original work') }}
          <AppIcon name="arrow" />
        </a>
        <button
          :disabled="viewerSwitching || viewerIndex === items.length - 1"
          :aria-label="t('下一件作品', 'Next work')"
          @click="changeViewer(1)"
        >
          <AppIcon name="down" />
        </button>
      </div>
    </div>
  </dialog>
</template>
