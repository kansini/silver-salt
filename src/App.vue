<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppIcon from './components/AppIcon.vue'
import { gallery } from './gallery'
import footerBackground from './assets/footer_bg.jpg'

gsap.registerPlugin(ScrollTrigger)
type Language = 'zh' | 'en'
type Filter = 'all' | 'photo' | 'video'
const root = ref<HTMLElement>()
const archive = ref<HTMLElement>()
const download = ref<HTMLElement>()
const footerMedia = ref<HTMLElement>()
const dialog = ref<HTMLDialogElement>()
const viewerVideo = ref<HTMLVideoElement>()
function saved(key: string) { try { return localStorage.getItem(key) } catch { return null } }
function save(key: string, value: string) { try { localStorage.setItem(key, value) } catch { /* Storage is optional. */ } }
const language = ref<Language>(saved('silver-salt-language') === 'en' ? 'en' : 'zh')
const theme = ref(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
const t = (zh: string, en: string) => language.value === 'zh' ? zh : en
const filter = ref<Filter>('all')
const activeIndex = ref(0)
const viewerIndex = ref<number | null>(null)
const reducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
const visible = ref(!document.hidden)
const filtered = computed(() => gallery.filter(item => filter.value === 'all' || item.type === filter.value))
const active = computed(() => filtered.value[activeIndex.value] ?? filtered.value[0]!)
const viewing = computed(() => viewerIndex.value === null ? null : filtered.value[viewerIndex.value] ?? null)
const nearby = computed(() => {
  const start = Math.max(0, Math.min(activeIndex.value - 2, filtered.value.length - 5))
  return filtered.value.slice(start, start + 5).map((item, i) => ({ item, index: start + i }))
})
const filters: { id: Filter; zh: string; en: string }[] = [
  { id: 'all', zh: '全部', en: 'All works' }, { id: 'photo', zh: '照片', en: 'Photos' }, { id: 'video', zh: '视频', en: 'Films' },
]
const storeUrl = 'https://apps.apple.com/app/id6767806037'
const number = (value: number) => String(value).padStart(2, '0')
let animation: gsap.core.Tween | undefined
let footerParallax: gsap.core.Tween | undefined
let intro: gsap.Context | undefined
let preferenceMedia: MediaQueryList | undefined
let observer: ResizeObserver | undefined
let refreshTimer: gsap.core.Tween | undefined
const progress = { value: 0 }
let viewerScrollPosition = 0
let viewerMotion: gsap.core.Timeline | undefined
let viewerMotionVersion = 0
let viewerClosing = false
let expectedViewerCloses = 0
let viewerSourceImage: HTMLImageElement | undefined
const viewerPhotoSource = ref('')

watch(viewing, async item => {
  if (item?.type !== 'photo') return
  viewerPhotoSource.value = item.preview
  const image = new Image()
  image.src = item.src
  try {
    await image.decode()
    if (viewing.value === item && !viewerClosing) viewerPhotoSource.value = item.src
  } catch { /* Keep the lightweight preview if the original cannot load. */ }
})

function resetViewerMotion() {
  viewerMotion?.kill(); viewerMotion = undefined
  if (!dialog.value) return
  gsap.set(dialog.value.querySelectorAll('.viewer-surface, .viewer-header, .viewer-footer, .viewer-media img, .viewer-media video'), { clearProps: 'transform,opacity' })
}
function photoOrigin(index: number) {
  const card = root.value?.querySelectorAll<HTMLElement>('.work-card')[index]
  const image = card?.querySelector('img')
  if (!card || !image || card.style.visibility === 'hidden') return null
  const rect = image.getBoundingClientRect()
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return null
  // object-fit:contain leaves empty space inside the thumbnail element.
  const item = filtered.value[index]!
  const fit = Math.min(image.offsetWidth / item.width, image.offsetHeight / item.height)
  const scale = Number(gsap.getProperty(card, 'scaleX')) || 1
  const width = item.width * fit * scale
  const height = item.height * fit * scale
  return {
    rect: { left: rect.left + (rect.width - width) / 2, top: rect.top + (rect.height - height) / 2, width, height },
    rotation: Number(gsap.getProperty(card, 'rotation')) || 0,
    image,
  }
}
function photoTransform(image: Element, origin: NonNullable<ReturnType<typeof photoOrigin>>) {
  const rect = image.getBoundingClientRect()
  return {
    x: origin.rect.left + origin.rect.width / 2 - rect.left - rect.width / 2,
    y: origin.rect.top + origin.rect.height / 2 - rect.top - rect.height / 2,
    scaleX: origin.rect.width / rect.width,
    scaleY: origin.rect.height / rect.height,
    rotation: origin.rotation,
  }
}

watch(theme, value => {
  document.documentElement.dataset.theme = value
  save('silver-salt-theme', value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#1b1c1a' : '#edede9')
}, { immediate: true })
watch(language, async value => {
  document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en'
  save('silver-salt-language', value)
  document.title = t('银盐 · 日常作品集', 'Silver Salt · The Everyday Archive')
  const description = t('用银盐拍摄的照片与视频作品。让光影、纸张与记忆，在时光里显影。', 'Photos and films captured with Silver Salt. An everyday archive of light, paper and memory.')
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  await nextTick(); ScrollTrigger.refresh()
}, { immediate: true })

function renderCards() {
  if (!root.value) return
  const current = Math.round(progress.value)
  if (activeIndex.value !== current) activeIndex.value = current
  const height = archive.value?.querySelector('.gallery-stage')?.clientHeight ?? window.innerHeight
  root.value.querySelectorAll<HTMLElement>('.work-card').forEach((card, i) => {
    const distance = i - (reducedMotion.value ? current : progress.value)
    const show = Math.abs(distance) < (reducedMotion.value ? .5 : 1.7)
    card.style.visibility = show ? 'visible' : 'hidden'
    gsap.set(card, {
      y: distance * height * (window.innerWidth > 760 ? .62 : .77),
      x: reducedMotion.value ? 0 : Math.sin(distance * 1.6) * (window.innerWidth > 760 ? 50 : 18),
      rotation: reducedMotion.value ? 0 : distance * -8,
      scale: 1 - Math.min(Math.abs(distance), 2) * .12,
      opacity: show ? 1 : 0,
      zIndex: 10 - Math.round(Math.abs(distance) * 3),
    })
  })
}
function setupGallery() {
  animation?.scrollTrigger?.kill(); animation?.kill()
  progress.value = 0; activeIndex.value = 0
  renderCards()
  if (!archive.value) return
  animation = gsap.to(progress, {
    value: filtered.value.length - 1,
    ease: 'none',
    scrollTrigger: {
      trigger: archive.value, start: 'top top', end: 'bottom bottom', scrub: reducedMotion.value ? true : .6,
      invalidateOnRefresh: true, onRefresh: renderCards,
    },
    onUpdate: renderCards,
  })
  ScrollTrigger.refresh()
}
async function setFilter(value: Filter) {
  if (value === filter.value) return
  finishViewer(); filter.value = value
  await nextTick(); setupGallery()
  window.scrollTo({ top: archive.value?.offsetTop ?? 0, behavior: 'instant' })
}
function goTo(index: number) {
  if (index < 0 || index >= filtered.value.length) return
  const trigger = animation?.scrollTrigger
  if (!trigger) return
  const target = trigger.start + (trigger.end - trigger.start) * index / Math.max(1, filtered.value.length - 1)
  window.scrollTo({ top: target, behavior: reducedMotion.value ? 'instant' : 'smooth' })
}
async function openViewer(index: number) {
  if (viewerIndex.value !== null) return
  const origin = filtered.value[index]?.type === 'photo' ? photoOrigin(index) : null
  const version = ++viewerMotionVersion
  viewerScrollPosition = window.scrollY
  viewerClosing = false
  viewerIndex.value = index
  await nextTick()
  if (version !== viewerMotionVersion || !dialog.value || viewerIndex.value === null) return
  resetViewerMotion()
  const media = dialog.value.querySelector('.viewer-media img, .viewer-media video')
  const surface = dialog.value.querySelector('.viewer-surface')
  const chrome = dialog.value.querySelectorAll('.viewer-header, .viewer-footer')
  // Set hidden styles before entering the top layer to avoid a single-frame flash.
  if (!reducedMotion.value) {
    if (surface) gsap.set(surface, { opacity: 0 })
    gsap.set(chrome, { opacity: 0 })
  }
  dialog.value.showModal()
  playViewerVideo()
  if (reducedMotion.value || !media) return
  if (origin) { viewerSourceImage = origin.image; gsap.set(viewerSourceImage, { opacity: 0 }) }
  viewerMotion = gsap.timeline({ onComplete: resetViewerMotion })
    .to(surface, { opacity: 1, duration: .38, ease: 'power2.out' }, 0)
    .fromTo(media, origin ? photoTransform(media, origin) : { scale: .94, y: 18, opacity: 0 }, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, opacity: 1, duration: .55, ease: 'power3.inOut' }, 0)
    .fromTo(chrome, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .28, stagger: .04, ease: 'power2.out' }, .22)
}

function finishViewer() {
  const wasViewing = viewerIndex.value !== null
  ++viewerMotionVersion
  resetViewerMotion()
  viewerVideo.value?.pause()
  if (viewerSourceImage) gsap.set(viewerSourceImage, { clearProps: 'opacity' })
  viewerSourceImage = undefined
  if (dialog.value?.open) { expectedViewerCloses++; dialog.value.close() }
  viewerIndex.value = null
  viewerClosing = false
  if (wasViewing) window.scrollTo({ top: viewerScrollPosition, behavior: 'instant' })
}
function closeViewer() {
  if (viewerIndex.value === null || viewerClosing) return
  viewerClosing = true
  ++viewerMotionVersion
  viewerVideo.value?.pause()
  viewerMotion?.kill()
  if (reducedMotion.value || !dialog.value?.open) { finishViewer(); return }
  const media = dialog.value.querySelector('.viewer-media img, .viewer-media video')
  const origin = viewing.value?.type === 'photo' && viewerIndex.value === activeIndex.value ? photoOrigin(viewerIndex.value) : null
  // Measure the untransformed fullscreen image even when closing during its entrance.
  const transform = media && origin ? (() => {
    const previous = Object.fromEntries(['x', 'y', 'scaleX', 'scaleY', 'rotation', 'opacity'].map(property => [property, gsap.getProperty(media, property)]))
    gsap.set(media, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0 })
    const target = photoTransform(media, origin)
    gsap.set(media, previous)
    return target
  })() : { scale: .95, y: 12, opacity: 0 }
  viewerMotion = gsap.timeline({ onComplete: finishViewer })
    .to(dialog.value.querySelectorAll('.viewer-header, .viewer-footer'), { opacity: 0, y: 6, duration: .18, ease: 'power2.in' }, 0)
    .to(dialog.value.querySelector('.viewer-surface'), { opacity: 0, duration: .35, ease: 'power2.inOut' }, .04)
  if (media) viewerMotion.to(media, { ...transform, duration: .42, ease: 'power3.inOut' }, 0)
}
function nativeViewerClosed() {
  // Native close events are queued; an older event must not cancel a new opening.
  if (expectedViewerCloses > 0) { expectedViewerCloses--; return }
  if (!dialog.value?.open) finishViewer()
}
function changeViewer(direction: number) {
  if (viewerIndex.value === null || viewerClosing) return
  const target = viewerIndex.value + direction
  if (target >= 0 && target < filtered.value.length) {
    resetViewerMotion(); viewerVideo.value?.pause(); viewerIndex.value = target
  }
}
function viewerKeys(event: KeyboardEvent) {
  if (event.target instanceof HTMLVideoElement) return
  if (event.key === 'ArrowLeft') { event.preventDefault(); changeViewer(-1) }
  if (event.key === 'ArrowRight') { event.preventDefault(); changeViewer(1) }
}
function playViewerVideo() {
  const video = viewerVideo.value
  if (!video) return
  if (document.hidden || viewerClosing || !dialog.value?.open) { video.pause(); return }
  void video.play().catch(() => { /* A browser may defer playback until media is ready. */ })
}
function visibilityChanged() {
  visible.value = !document.hidden
  if (document.hidden) viewerVideo.value?.pause(); else playViewerVideo()
}
function setupFooterParallax() {
  footerParallax?.scrollTrigger?.kill(); footerParallax?.kill()
  if (!footerMedia.value || !download.value) return
  gsap.set(footerMedia.value, { clearProps: 'transform' })
  if (reducedMotion.value) return
  footerParallax = gsap.fromTo(footerMedia.value,
    { y: () => -(download.value?.offsetHeight ?? 0) * .12 },
    {
      y: () => (download.value?.offsetHeight ?? 0) * .12,
      ease: 'none',
      scrollTrigger: {
        trigger: download.value, start: 'top bottom', end: 'bottom top', scrub: .6,
        invalidateOnRefresh: true,
      },
    },
  )
}
function motionChanged(event: MediaQueryListEvent) { reducedMotion.value = event.matches; if (event.matches) { if (viewerClosing) finishViewer(); else resetViewerMotion() }; renderCards(); setupFooterParallax() }
onMounted(async () => {
  await nextTick(); setupGallery(); setupFooterParallax()
  preferenceMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
  preferenceMedia.addEventListener('change', motionChanged)
  document.addEventListener('visibilitychange', visibilityChanged)
  observer = new ResizeObserver(() => {
    renderCards(); refreshTimer?.kill(); refreshTimer = gsap.delayedCall(.15, () => ScrollTrigger.refresh())
  })
  if (root.value) observer.observe(root.value)
  if (!reducedMotion.value) intro = gsap.context(() => {
    gsap.from('.masthead, .gallery-meta, .work-info, .gallery-bottom', { opacity: 0, y: 12, duration: .8, stagger: .1, ease: 'power2.out' })
    gsap.from('.work-image', { opacity: 0, duration: 1.2, ease: 'power2.out' })
  }, root.value)
})
onBeforeUnmount(() => {
  ++viewerMotionVersion; resetViewerMotion(); viewerVideo.value?.pause(); dialog.value?.close()
  if (viewerSourceImage) gsap.set(viewerSourceImage, { clearProps: 'opacity' })
  footerParallax?.scrollTrigger?.kill(); footerParallax?.kill()
  animation?.scrollTrigger?.kill(); animation?.kill(); intro?.revert(); observer?.disconnect(); refreshTimer?.kill()
  preferenceMedia?.removeEventListener('change', motionChanged)
  document.removeEventListener('visibilitychange', visibilityChanged)
})
</script>

<template>
  <div ref="root" class="archive-site">
    <a class="skip-link" href="#download">{{ t('跳到下载入口', 'Skip to download') }}</a>
    <header class="masthead">
      <a class="wordmark" href="#main" :aria-label="t('银盐首页', 'Silver Salt home')"><img class="brand-icon" src="/assets/app-icon.webp" alt="" width="40" height="40" /><span class="wordmark-text">SILVER SALT<sup>©</sup></span></a>
      <div class="masthead-note">{{ t('在时光里显影', 'Developed in time') }}<br />{{ t('情绪胶片相机', 'A film-inspired camera') }}</div>
      <div class="header-tools">
        <button :aria-label="t('切换至英文', 'Switch to Chinese')" class="language-toggle" @click="language = language === 'zh' ? 'en' : 'zh'"><span :class="{ selected: language === 'zh' }" lang="zh-CN">中</span> / <span :class="{ selected: language === 'en' }" lang="en">EN</span></button>
        <button class="theme-toggle" :aria-label="theme === 'light' ? t('切换至深色模式', 'Switch to dark mode') : t('切换至浅色模式', 'Switch to light mode')" :aria-pressed="theme === 'dark'" @click="theme = theme === 'light' ? 'dark' : 'light'"><AppIcon :name="theme === 'light' ? 'moon' : 'sun'" /></button>
        <a :href="storeUrl" class="header-download" target="_blank" rel="noopener noreferrer">{{ t('下载银盐', 'Get the app') }} <AppIcon name="arrow" /></a>
      </div>
    </header>
    <main id="main">
      <section ref="archive" class="gallery-scroll" :style="{ height: `${Math.max(1, filtered.length - 1) * 78 + 100}svh` }" :aria-label="t('银盐照片与视频作品集', 'Silver Salt photo and film archive')">
        <div class="gallery-stage">
          <aside class="gallery-meta">
            <p class="small-label">{{ t('日常作品集', 'THE EVERYDAY ARCHIVE') }} / 2026</p>
            <h1>{{ t('看见。', 'See. ') }}<br />{{ t('记录。', 'Keep. ') }}<br /><span>{{ t('再想念。', 'Remember.') }}</span></h1>
            <div class="filter-controls" role="group" :aria-label="t('筛选作品', 'Filter works')"><button v-for="option in filters" :key="option.id" :aria-pressed="filter === option.id" :class="{ selected: filter === option.id }" @click="setFilter(option.id)">{{ t(option.zh, option.en) }}<sup>{{ number(option.id === 'all' ? gallery.length : gallery.filter(item => item.type === option.id).length) }}</sup></button></div>
            <div class="capture-details"><div><span>{{ t('拍摄', 'Captured with') }}</span><strong>{{ t('银盐 App', 'Silver Salt App') }}</strong></div><div><span>{{ t('作品类型', 'Format') }}</span><strong>{{ active.type === 'photo' ? t('照片 / 纸上记忆', 'Photo / Paper memory') : t('视频 / 流动的时光', 'Film / Moving moments') }}</strong></div><div><span>{{ t('时间', 'Collection') }}</span><strong>2026 / 10</strong></div></div>
            <p class="gallery-intro">{{ t('每一张，都是生活的原样。', 'Every frame, a little piece of life.') }}<br />{{ t('所有作品均通过银盐拍摄。', 'All works captured with Silver Salt.') }}</p>
          </aside>
          <div class="work-stream">
            <button v-for="(item, index) in filtered" :key="item.id" class="work-card" :class="{ 'is-active': index === activeIndex }" :tabindex="index === activeIndex ? 0 : -1" :aria-hidden="index !== activeIndex" :aria-label="`${t('查看', 'View')} ${item.title[language]}`" @pointerdown.prevent @click="openViewer(index)">
              <div class="work-image">
                <img :src="item.preview" :alt="item.title[language]" :width="item.width" :height="item.height" :loading="index < 3 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" />
                <video v-if="item.type === 'video' && index === activeIndex && !reducedMotion && visible && viewerIndex === null" :key="item.id" :src="item.src" :poster="item.preview" autoplay muted loop playsinline preload="none" aria-hidden="true"></video>
              </div>
              <span class="work-hover"><AppIcon :name="item.type === 'video' ? 'play' : 'arrow'" />{{ item.type === 'video' ? t('播放完整视频', 'Play film') : t('查看完整照片', 'View photo') }}</span>
            </button>
          </div>
          <aside class="work-info">
            <div class="work-heading"><p class="small-label">{{ active.type === 'photo' ? t('照片', 'PHOTOGRAPH') : t('短片', 'SHORT FILM') }}<span v-if="active.duration"> / {{ active.duration.toFixed(1) }}s</span></p><h2>{{ active.title[language] }}</h2><p>{{ active.description[language] }}</p><button class="view-link" @pointerdown.prevent @click="openViewer(activeIndex)">{{ t('打开作品', 'Open work') }} <AppIcon name="arrow" /></button></div>
            <nav class="work-index" :aria-label="t('作品索引', 'Work index')"><p class="small-label">{{ t('作品索引', 'SELECTED WORKS') }} <span>{{ number(filtered.length) }}</span></p><button v-for="entry in nearby" :key="entry.item.id" :class="{ current: entry.index === activeIndex }" :aria-current="entry.index === activeIndex ? 'true' : undefined" @click="goTo(entry.index)"><small>{{ number(entry.index + 1) }}</small><span>{{ entry.item.title[language] }}</span><span class="index-type">{{ entry.item.type === 'video' ? t('视频', 'Film') : t('照片', 'Photo') }}</span></button><label class="jump-select"><span>{{ t('跳转到作品', 'Jump to work') }}</span><select :value="activeIndex" :aria-label="t('跳转到作品', 'Jump to work')" @change="goTo(Number(($event.target as HTMLSelectElement).value))"><option v-for="(item, index) in filtered" :key="item.id" :value="index">{{ number(index + 1) }} / {{ item.title[language] }}</option></select></label></nav>
          </aside>
          <div class="gallery-bottom"><div class="counter"><span class="small-label">{{ t('当前作品', 'SELECTED WORK') }}</span><strong>{{ number(activeIndex + 1) }}</strong><small>/ {{ number(filtered.length) }}</small></div><div class="browse-controls"><button :disabled="activeIndex === 0" :aria-label="t('上一件作品', 'Previous work')" @click="goTo(activeIndex - 1)"><AppIcon name="up" /></button><span>{{ t('滚动，慢慢看。', 'SCROLL TO EXPLORE') }}</span><button :disabled="activeIndex === filtered.length - 1" :aria-label="t('下一件作品', 'Next work')" @click="goTo(activeIndex + 1)"><AppIcon name="down" /></button></div><a class="bottom-download" href="#download">{{ t('你的下一张，从这里开始', 'Your next frame starts here') }} <AppIcon name="arrow" /></a></div>
        </div>
      </section>
      <section id="download" ref="download" class="download-section"><div ref="footerMedia" class="footer-background" aria-hidden="true"><img :src="footerBackground" alt="" width="4032" height="3024" loading="lazy" decoding="async" /></div><p class="small-label">{{ t('拍下你的日常', 'MAKE YOUR OWN ARCHIVE') }}</p><h2>{{ t('下一张，', 'The next frame,') }}<br /><span>{{ t('是你的故事。', 'your story.') }}</span></h2><div class="download-row"><p>{{ t('照片、短片、胶片色彩。', 'Photos. Films. A little film feeling.') }}<br />{{ t('把眼前的生活，留给以后的自己。', 'Keep a piece of today for your future self.') }}</p><a class="download-button" :href="storeUrl" target="_blank" rel="noopener noreferrer"><AppIcon name="apple" /><span><small>Download on the</small>App Store</span><AppIcon name="arrow" /></a></div><footer><a href="#main">SILVER SALT © {{ new Date().getFullYear() }}</a><span>{{ t('在时光里显影', 'Developed in time') }}</span><a href="#main">{{ t('回到作品', 'Back to the archive') }} <AppIcon name="up" /></a></footer></section>
    </main>
    <dialog ref="dialog" class="work-viewer" :aria-label="t('作品全屏查看', 'Full-screen work viewer')" @cancel.prevent="closeViewer" @close="nativeViewerClosed" @keydown="viewerKeys" @click="event => { if (event.target === dialog) closeViewer() }">
      <div key="viewer-surface" class="viewer-surface" aria-hidden="true"></div>
      <div v-if="viewing" key="viewer-content" class="viewer-content"><div class="viewer-header"><span>{{ number((viewerIndex ?? 0) + 1) }} / {{ number(filtered.length) }} — {{ viewing.title[language] }}</span><button :aria-label="t('关闭作品', 'Close viewer')" @click="closeViewer"><AppIcon name="close" /></button></div><div class="viewer-media"><video v-if="viewing.type === 'video'" ref="viewerVideo" :key="viewing.id" :src="viewing.src" :poster="viewing.preview" autoplay muted loop playsinline preload="auto" :tabindex="-1" @loadeddata="playViewerVideo"></video><img v-else :key="viewing.id" :src="viewerPhotoSource || viewing.preview" :alt="viewing.title[language]" :width="viewing.width" :height="viewing.height" /></div><div class="viewer-footer"><button :disabled="viewerIndex === 0" :aria-label="t('上一件作品', 'Previous work')" @click="changeViewer(-1)"><AppIcon name="up" /></button><p>{{ viewing.description[language] }}</p><a :href="viewing.original ?? viewing.src" target="_blank" rel="noopener noreferrer">{{ t('原始作品', 'Original work') }} <AppIcon name="arrow" /></a><button :disabled="viewerIndex === filtered.length - 1" :aria-label="t('下一件作品', 'Next work')" @click="changeViewer(1)"><AppIcon name="down" /></button></div></div>
    </dialog>
  </div>
</template>
