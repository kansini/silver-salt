<script setup lang="ts">
import { ref } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import GallerySection from './components/GallerySection.vue';
import DownloadSection from './components/DownloadSection.vue';
import { provideSitePreferences } from './composables/useSitePreferences';
import { usePageIntro } from './composables/usePageIntro';
const root = ref<HTMLElement>();
const { t, reducedMotion } = provideSitePreferences();
usePageIntro(root, reducedMotion);
</script>

<template>
  <div ref="root" class="archive-site">
    <a class="skip-link" href="#download">{{ t('跳到下载入口', 'Skip to download') }}</a>
    <SiteHeader />
    <main id="main">
      <GallerySection />
      <DownloadSection />
    </main>
  </div>
</template>
