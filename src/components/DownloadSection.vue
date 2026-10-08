<script setup lang="ts">
import { ref } from 'vue';
import AppIcon from './AppIcon.vue';
import footerBackground from '../assets/footer_bg.jpg';
import { APP_STORE_URL as storeUrl } from '../config/site';
import { useFooterParallax } from '../composables/useFooterParallax';
import { useSitePreferences } from '../composables/useSitePreferences';
const download = ref<HTMLElement>();
const footerMedia = ref<HTMLElement>();
const { t } = useSitePreferences();
useFooterParallax(download, footerMedia);
</script>

<template>
  <section id="download" ref="download" class="download-section">
    <div ref="footerMedia" class="footer-background" aria-hidden="true">
      <img :src="footerBackground" alt="" width="4032" height="3024" loading="lazy" decoding="async" />
    </div>
    <p class="small-label">{{ t('拍下你的日常', 'MAKE YOUR OWN ARCHIVE') }}</p>
    <h2>
      {{ t('下一张，', 'The next frame,') }}
      <br />
      <span>{{ t('是你的故事。', 'your story.') }}</span>
    </h2>
    <div class="download-row">
      <p>
        {{ t('照片、短片、胶片色彩。', 'Photos. Films. A little film feeling.') }}
        <br />
        {{ t('把眼前的生活，留给以后的自己。', 'Keep a piece of today for your future self.') }}
      </p>
      <a class="download-button" :href="storeUrl" target="_blank" rel="noopener noreferrer">
        <AppIcon name="apple" />
        <span>
          <small>Download on the</small>
          App Store
        </span>
        <AppIcon name="arrow" />
      </a>
    </div>
    <footer>
      <a href="#main">SILVER SALT © {{ new Date().getFullYear() }}</a>
      <span>{{ t('在时光里显影', 'Developed in time') }}</span>
      <a href="#main">
        {{ t('回到作品', 'Back to the archive') }}
        <AppIcon name="up" />
      </a>
    </footer>
  </section>
</template>
