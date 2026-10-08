<script setup lang="ts">
import AppIcon from './AppIcon.vue';
import { APP_STORE_URL as storeUrl } from '../config/site';
import { useSitePreferences } from '../composables/useSitePreferences';
const { language, theme, t } = useSitePreferences();
</script>

<template>
  <header class="masthead">
    <a class="wordmark" href="#main" :aria-label="t('银盐首页', 'Silver Salt home')">
      <img class="brand-icon" src="/assets/app-icon.webp" alt="" width="40" height="40" />
      <span class="wordmark-text">
        SILVER SALT
        <sup>©</sup>
      </span>
    </a>
    <div class="masthead-note">
      {{ t('在时光里显影', 'Developed in time') }}
      <br />
      {{ t('情绪胶片相机', 'A film-inspired camera') }}
    </div>
    <div class="header-tools">
      <button
        :aria-label="t('切换至英文', 'Switch to Chinese')"
        class="language-toggle"
        @click="language = language === 'zh' ? 'en' : 'zh'"
      >
        <span :class="{ selected: language === 'zh' }" lang="zh-CN">中</span>
        /
        <span :class="{ selected: language === 'en' }" lang="en">EN</span>
      </button>
      <button
        class="theme-toggle"
        :aria-label="theme === 'light' ? t('切换至深色模式', 'Switch to dark mode') : t('切换至浅色模式', 'Switch to light mode')"
        :aria-pressed="theme === 'dark'"
        @click="theme = theme === 'light' ? 'dark' : 'light'"
      >
        <AppIcon :name="theme === 'light' ? 'moon' : 'sun'" />
      </button>
      <a :href="storeUrl" class="header-download" target="_blank" rel="noopener noreferrer">
        {{ t('下载银盐', 'Get the app') }}
        <AppIcon name="arrow" />
      </a>
    </div>
  </header>
</template>
