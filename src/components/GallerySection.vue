<script setup lang="ts">
import { ref } from 'vue';
import AppIcon from './AppIcon.vue';
import WorkViewer from './WorkViewer.vue';
import { gallery } from '../gallery';
import { useGallery } from '../composables/useGallery';
import { useSitePreferences } from '../composables/useSitePreferences';
import { formatWorkNumber as number } from '../utils/format';
const archive = ref<HTMLElement>();
const viewer = ref<InstanceType<typeof WorkViewer>>();
const viewerOpen = ref(false);
const { language, t, reducedMotion, visible } = useSitePreferences();
const { filter, activeIndex, filtered, active, nearby, filters, setFilter, goTo, photoOrigin } = useGallery(archive, () => viewer.value?.finish());
function openViewer(index: number) { void viewer.value?.open(index); }
</script>

<template>
  <section
    ref="archive"
    class="gallery-scroll"
    :style="{ height: `${Math.max(1, filtered.length - 1) * 78 + 100}svh` }"
    :aria-label="t('银盐照片与视频作品集', 'Silver Salt photo and film archive')"
  >
    <div class="gallery-stage">
      <aside class="gallery-meta">
        <p class="small-label">{{ t('日常作品集', 'THE EVERYDAY ARCHIVE') }} / 2026</p>
        <h1>
          {{ t('看见。', 'See. ') }}
          <br />
          {{ t('记录。', 'Keep. ') }}
          <br />
          <span>{{ t('再想念。', 'Remember.') }}</span>
        </h1>
        <div class="filter-controls" role="group" :aria-label="t('筛选作品', 'Filter works')">
          <button
            v-for="option in filters"
            :key="option.id"
            :aria-pressed="filter === option.id"
            :class="{ selected: filter === option.id }"
            @click="setFilter(option.id)"
          >
            {{ t(option.zh, option.en) }}
            <sup>
              {{ number(option.id === 'all' ? gallery.length : gallery.filter(item => item.type === option.id).length) }}
            </sup>
          </button>
        </div>
        <div class="capture-details">
          <div>
            <span>{{ t('拍摄', 'Captured with') }}</span>
            <strong>{{ t('银盐 App', 'Silver Salt App') }}</strong>
          </div>
          <div>
            <span>{{ t('作品类型', 'Format') }}</span>
            <strong>
              {{ active.type === 'photo' ? t('照片 / 纸上记忆', 'Photo / Paper memory') : t('视频 / 流动的时光', 'Film / Moving moments') }}
            </strong>
          </div>
          <div>
            <span>{{ t('时间', 'Collection') }}</span>
            <strong>2026 / 10</strong>
          </div>
        </div>
        <p class="gallery-intro">
          {{ t('每一张，都是生活的原样。', 'Every frame, a little piece of life.') }}
          <br />
          {{ t('所有作品均通过银盐拍摄。', 'All works captured with Silver Salt.') }}
        </p>
      </aside>
      <div class="work-stream">
        <button
          v-for="(item, index) in filtered"
          :key="item.id"
          class="work-card"
          :class="{ 'is-active': index === activeIndex }"
          :tabindex="index === activeIndex ? 0 : -1"
          :aria-hidden="index !== activeIndex"
          :aria-label="`${t('查看', 'View')} ${item.title[language]}`"
          @pointerdown.prevent
          @click="openViewer(index)"
        >
          <div class="work-image">
            <img
              :src="item.preview"
              :alt="item.title[language]"
              :width="item.width"
              :height="item.height"
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />
            <video
              v-if="item.type === 'video' && index === activeIndex && !reducedMotion && visible && !viewerOpen"
              :key="item.id"
              :src="item.src"
              :poster="item.preview"
              autoplay
              muted
              loop
              playsinline
              preload="none"
              aria-hidden="true"
            >
            </video>
          </div>
          <span class="work-hover">
            <AppIcon :name="item.type === 'video' ? 'play' : 'arrow'" />
            {{ item.type === 'video' ? t('播放完整视频', 'Play film') : t('查看完整照片', 'View photo') }}
          </span>
        </button>
      </div>
      <aside class="work-info">
        <div class="work-heading">
          <p class="small-label">
            {{ active.type === 'photo' ? t('照片', 'PHOTOGRAPH') : t('短片', 'SHORT FILM') }}
            <span v-if="active.duration">/ {{ active.duration.toFixed(1) }}s</span>
          </p>
          <h2>{{ active.title[language] }}</h2>
          <p>{{ active.description[language] }}</p>
          <button class="view-link" @pointerdown.prevent @click="openViewer(activeIndex)">
            {{ t('打开作品', 'Open work') }}
            <AppIcon name="arrow" />
          </button>
        </div>
        <nav class="work-index" :aria-label="t('作品索引', 'Work index')">
          <p class="small-label">
            {{ t('作品索引', 'SELECTED WORKS') }}
            <span>{{ number(filtered.length) }}</span>
          </p>
          <button
            v-for="entry in nearby"
            :key="entry.item.id"
            :class="{ current: entry.index === activeIndex }"
            :aria-current="entry.index === activeIndex ? 'true' : undefined"
            @click="goTo(entry.index)"
          >
            <small>{{ number(entry.index + 1) }}</small>
            <span>{{ entry.item.title[language] }}</span>
            <span class="index-type">{{ entry.item.type === 'video' ? t('视频', 'Film') : t('照片', 'Photo') }}</span>
          </button>
          <label class="jump-select">
            <span>{{ t('跳转到作品', 'Jump to work') }}</span>
            <select
              :value="activeIndex"
              :aria-label="t('跳转到作品', 'Jump to work')"
              @change="goTo(Number(($event.target as HTMLSelectElement).value))"
            >
              <option v-for="(item, index) in filtered" :key="item.id" :value="index">
                {{ number(index + 1) }} / {{ item.title[language] }}
              </option>
            </select>
          </label>
        </nav>
      </aside>
      <div class="gallery-bottom">
        <div class="counter">
          <span class="small-label">{{ t('当前作品', 'SELECTED WORK') }}</span>
          <strong>{{ number(activeIndex + 1) }}</strong>
          <small>/ {{ number(filtered.length) }}</small>
        </div>
        <div class="browse-controls">
          <button
            :disabled="activeIndex === 0"
            :aria-label="t('上一件作品', 'Previous work')"
            @click="goTo(activeIndex - 1)"
          >
            <AppIcon name="up" />
          </button>
          <span>{{ t('滚动，慢慢看。', 'SCROLL TO EXPLORE') }}</span>
          <button
            :disabled="activeIndex === filtered.length - 1"
            :aria-label="t('下一件作品', 'Next work')"
            @click="goTo(activeIndex + 1)"
          >
            <AppIcon name="down" />
          </button>
        </div>
        <a class="bottom-download" href="#download">
          {{ t('你的下一张，从这里开始', 'Your next frame starts here') }}
          <AppIcon name="arrow" />
        </a>
      </div>
    </div>
  </section>
  <WorkViewer
    ref="viewer"
    :items="filtered"
    :active-index="activeIndex"
    :get-photo-origin="photoOrigin"
    @open-change="viewerOpen = $event"
  />
</template>
