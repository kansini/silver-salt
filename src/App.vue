<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppIcon from './components/AppIcon.vue'

gsap.registerPlugin(ScrollTrigger)
const storeUrl = 'https://apps.apple.com/app/id6767806037'
const root = ref<HTMLElement>()
const menuOpen = ref(false)
const dialog = ref<HTMLDialogElement>()
const video = ref<HTMLVideoElement>()
const preview = ref<HTMLElement>()
const selectedTone = ref(0)
const selectedFrame = ref('classic')
const grain = ref(25)
const tones = [
  { name: '山野青调', label: '清透的绿，和自由的风。', color: '#60745a', filter: 'saturate(.82) contrast(.94)' },
  { name: '午后暖光', label: '像被阳光晒过的旧时光。', color: '#b99767', filter: 'sepia(.4) saturate(.85) contrast(.94)' },
  { name: '黑白片刻', label: '安静一点，让光影说话。', color: '#777973', filter: 'grayscale(1) contrast(1.05)' },
]
const tone = computed(() => tones[selectedTone.value]!)
const questions = [
  { title: '银盐可以用来做什么？', answer: '你可以拍摄照片和短视频，实时选择胶片配方、纸质相框与颗粒度，也可以从相册导入照片。银盐还会为画面生成诗意标题，记录时间与地点，把日常整理成可以翻阅的记忆。' },
  { title: '可以修改照片上的文字吗？', answer: '可以。在相册中打开作品，通过编辑修改标题、地点和日期，也可以选择是否显示照片信息与水印文字。' },
  { title: '照片可以保存和分享吗？', answer: '可以。作品可保存到系统相册，并通过系统分享功能分享给朋友。照片和视频都可以在银盐相册中查看。' },
  { title: '支持哪些设备？', answer: '点击下方 App Store 按钮即可查看当前版本支持的设备、系统要求与下载信息。' },
]
let media: gsap.MatchMedia | undefined
let context: gsap.Context | undefined
let changeAnimation: gsap.core.Tween | undefined
let observer: ResizeObserver | undefined
let refreshCall: gsap.core.Tween | undefined
function chooseTone(index: number) {
  selectedTone.value = index
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && preview.value) {
    changeAnimation?.kill()
    changeAnimation = gsap.fromTo(preview.value, { opacity: .65, scale: .985 }, { opacity: 1, scale: 1, duration: .45, ease: 'power2.out' })
  }
}
function openVideo() { dialog.value?.showModal() }
function stopVideo() { video.value?.pause() }
function closeVideo() { dialog.value?.close(); stopVideo() }
onMounted(async () => {
  await nextTick()
  await document.fonts.ready
  if (!root.value) return
  context = gsap.context(() => {
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-copy > *', { y: 35, opacity: 0, duration: .9, stagger: .12 }, .1)
        .from('.hero-photo', { y: 100, opacity: 0, rotation: 0, duration: 1.3, stagger: .18 }, .15)
        .from('.hero-bottom', { opacity: 0, duration: .6 }, .8)
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, { y: 38, opacity: 0, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      })
      gsap.to('.hero-photo.front', { y: -35, rotation: 2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-photo.back', { y: -80, rotation: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.fromTo('.manifesto-image', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.to('.film-track', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: '.film-strip', start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root.value)
    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.memory').forEach((el, index) => {
        gsap.to(el, { y: index % 2 ? -35 : 25, ease: 'none', scrollTrigger: { trigger: '.memory-wall', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })
    }, root.value)
  }, root.value)
  observer = new ResizeObserver(() => {
    refreshCall?.kill()
    refreshCall = gsap.delayedCall(.2, () => ScrollTrigger.refresh())
  })
  observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect(); refreshCall?.kill(); changeAnimation?.kill(); media?.revert(); context?.revert(); stopVideo()
})
</script>

<template>
  <div ref="root" class="site-shell">
    <a class="skip-link" href="#main">跳到正文</a>
    <header class="site-header">
      <a href="#" class="brand" aria-label="银盐首页"><img src="/assets/icon.webp" width="36" height="36" alt="" /><span>银盐<small>SILVER SALT</small></span></a>
      <nav :class="{ open: menuOpen }" aria-label="主导航" id="main-nav">
        <a href="#about" @click="menuOpen = false">关于银盐</a><a href="#experience" @click="menuOpen = false">胶片体验</a><a href="#moments" @click="menuOpen = false">日常收藏</a>
      </nav>
      <a class="header-download" :href="storeUrl" target="_blank" rel="noopener noreferrer">下载银盐 <AppIcon name="arrow" /></a>
      <button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="main-nav" :aria-label="menuOpen ? '关闭导航' : '打开导航'" @click="menuOpen = !menuOpen"><AppIcon :name="menuOpen ? 'close' : 'menu'" /></button>
    </header>
    <main id="main">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow"><span class="tiny-sun">✳</span> 给日常，一点胶片的温度</p>
          <h1>把平凡的今天，<br />拍成<span class="green handwritten">想念。</span></h1>
          <p class="hero-english">Life, in a softer light.</p>
          <p class="hero-description">一束光，一阵风，一个不必远行的下午。<br />用银盐，让路过的日常，在时光里显影。</p>
          <div class="hero-actions"><a class="button button-dark" :href="storeUrl" target="_blank" rel="noopener noreferrer"><AppIcon name="apple" /><span><small>Download on the</small>App Store</span><AppIcon name="arrow" /></a><button class="video-link" @click="openVideo"><span class="play-circle"><AppIcon name="play" /></span> 看一段银盐的日常</button></div>
          <p class="subtle hero-footnote">为 iPhone 而作 · 为每个值得停留的瞬间</p>
        </div>
        <div class="hero-art" aria-label="银盐照片作品展示">
          <span class="archive-label">THE EVERYDAY ARCHIVE<br /><span>VOL. 001 — 光阴的切片</span></span>
          <img class="hero-photo back" src="/assets/water-card.webp" alt="纸质相框里，水面上的细碎光影" width="832" height="998" />
          <img class="hero-photo front" src="/assets/forest-card.webp" alt="银盐作品：回忆停在这里，蓝天与森林" width="832" height="998" fetchpriority="high" />
          <span class="photo-note handwritten">把今天，轻轻收藏。<svg viewBox="0 0 110 60" aria-hidden="true"><path d="M105 5C72 50 44 60 8 28M8 28l3 20M8 28l21 2" /></svg></span>
          <span class="art-caption">一张照片 · 一小段时光</span>
        </div>
        <div class="hero-bottom"><span>在时光里显影</span><a href="#about">SCROLL TO DEVELOP <AppIcon name="down" /></a><span>光影 / 纸张 / 记忆</span></div>
      </section>
      <div class="film-strip" aria-hidden="true"><div class="film-track"><span v-for="n in 6" :key="n">SILVER SALT <i>✳</i> 让日常成为回忆 <i>✳</i> LIFE IN A SOFTER LIGHT <i>✳</i></span></div></div>
      <section id="about" class="about section-pad">
        <p class="eyebrow" data-reveal>01 / A LITTLE MORE FEELING</p>
        <div class="about-grid"><h2 data-reveal>我们留住的，<br />不只是<span class="green">风景。</span></h2><div data-reveal><p class="large-copy">还有那天的风，<br />和你不曾说出口的心情。</p><p class="body-copy">银盐是一款情绪胶片相机。把胶片色彩、纸质相框与诗意文字放在一起，让随手拍下的日常，有了可以翻阅的温度。</p><div class="feature-tags"><span>胶片色彩</span><span>纸质相框</span><span>诗意标题</span></div></div></div>
      </section>
      <section id="experience" class="experience section-pad">
        <div class="section-heading" data-reveal><div><p class="eyebrow">02 / FIND YOUR OWN TONE</p><h2>给这一刻，<br />选一种<span class="green">心情。</span></h2></div><p class="body-copy">同一束光，可以有不同的故事。<br />试试你的第一张银盐。</p></div>
        <div class="experience-grid">
          <div class="preview-stage" data-reveal><span class="stage-label">SILVER SALT / 调色实验室</span><figure ref="preview" class="demo-photo" :class="selectedFrame"><div class="demo-image"><img src="/assets/forest.webp" width="832" height="832" alt="蓝天与树林的调色预览" :style="{ filter: tone.filter }" /><span class="grain" :style="{ opacity: grain / 180 }"></span></div><figcaption><div><span class="handwritten">山野之间</span><small>某个有风的下午 · 2026.10.08</small></div><span class="frame-brand">银盐<br /><small>在时光里显影</small></span></figcaption></figure><p class="stage-note handwritten">每一种色彩，都是此刻的你。</p></div>
          <div class="controls" data-reveal><div class="control-heading"><span>01 — 胶片色彩</span><small>FILM MOOD</small></div><div class="tone-options" role="group" aria-label="选择胶片风格示意"><button v-for="(item, index) in tones" :key="item.name" :aria-pressed="selectedTone === index" :class="{ selected: selectedTone === index }" @click="chooseTone(index)"><span class="tone-swatch" :style="{ background: item.color }"></span><span>{{ item.name }}<small>{{ item.label }}</small></span><span class="tone-check">{{ selectedTone === index ? '✓' : '+' }}</span></button></div>
            <div class="control-heading"><span>02 — 纸质相框</span><small>PAPER FRAME</small></div><div class="frame-options" role="group" aria-label="选择相框风格示意"><button v-for="item in [{ id: 'classic', name: '经典留白' }, { id: 'slim', name: '窄边画幅' }, { id: 'stamp', name: '邮票记忆' }]" :key="item.id" :aria-pressed="selectedFrame === item.id" :class="{ selected: selectedFrame === item.id }" @click="selectedFrame = item.id"><span class="frame-symbol" :class="item.id"></span>{{ item.name }}</button></div>
            <label class="control-heading" for="grain"><span>03 — 胶片颗粒</span><small>{{ grain }}%</small></label><input id="grain" v-model.number="grain" type="range" min="0" max="100" /><p class="demo-disclaimer">网页为风格示意，实际胶片配方与相框以 App 为准。</p>
          </div>
        </div>
      </section>
      <section class="manifesto"><img class="manifesto-image" src="/assets/forest.webp" alt="" loading="lazy" /><div class="manifesto-copy" data-reveal><p class="eyebrow">LESS PERFECT. MORE PERSONAL.</p><h2>不必每张都完美。<br />只要每张，<span class="handwritten">都是你。</span></h2><p>让颜色带一点情绪，让光影留一点颗粒。<br />比起标准答案，我们更喜欢生活本来的样子。</p><button class="video-link light" @click="openVideo"><span class="play-circle"><AppIcon name="play" /></span> 走进银盐的日常 <AppIcon name="arrow" /></button></div><span class="manifesto-caption">光落下来的时候 / THE LIGHT WE KEEP</span></section>
      <section class="process section-pad"><div class="camera-stage" data-reveal><span class="eyebrow">THROUGH THE VIEWFINDER</span><div class="phone"><div class="phone-island"></div><img src="/assets/camera.webp" alt="银盐真实 App 界面：相框、调色配方和颗粒度设置" width="380" height="780" loading="lazy" /></div><span class="camera-note handwritten">慢一点，喜欢就在眼前。</span></div><div class="process-copy"><p class="eyebrow" data-reveal>03 / MAKE A LITTLE MEMORY</p><h2 data-reveal>从看见，<br />到<span class="green">念念不忘。</span></h2><ol><li data-reveal><span>01</span><div><h3>先找到喜欢的光</h3><p>实时预览胶片色彩，选好相框和颗粒感。<br />也可以导入旧照片，让回忆重新显影。</p></div></li><li data-reveal><span>02</span><div><h3>让瞬间慢慢显影</h3><p>按下快门，留下照片或短视频。<br />诗意标题、时间与地点，让记忆有迹可循。</p></div></li><li data-reveal><span>03</span><div><h3>收藏，也分享</h3><p>在相册里翻阅日常，修改属于你的文字，<br />保存作品，把这份心情分享给在意的人。</p></div></li></ol></div></section>
      <section id="moments" class="moments section-pad"><div class="section-heading" data-reveal><div><p class="eyebrow">04 / THE ORDINARY, KEPT</p><h2>没有大事发生。<br />也值得<span class="green">留一张。</span></h2></div><span class="handwritten gallery-note">致，平凡又珍贵的一天。</span></div><div class="memory-wall"><figure class="memory" data-reveal><img src="/assets/water-card.webp" width="832" height="998" alt="银盐纸质相框作品：水面光影" loading="lazy" /><figcaption><span>01 / 水面上的风</span><small>有风的时候，水也在写诗。</small></figcaption></figure><figure class="memory" data-reveal><img src="/assets/forest-card.webp" width="832" height="998" alt="银盐纸质相框作品：回忆停在这里" loading="lazy" /><figcaption><span>02 / 路过一片绿意</span><small>走过的风景，后来成了回忆。</small></figcaption></figure><div class="memory-poem" data-reveal><span>✳</span><p class="handwritten">停在一束光里<br />听风把树叶翻过<br />把没说完的心情<br />留给照片</p><small>A SMALL COLLECTION<br />OF EVERYDAY FEELINGS.</small><a href="#download">开始你的日常收藏 <AppIcon name="arrow" /></a></div></div></section>
      <section class="faq section-pad"><div data-reveal><p class="eyebrow">A FEW LITTLE THINGS</p><h2>你可能<br /><span class="green">还想知道。</span></h2></div><div class="faq-list" data-reveal><details v-for="item in questions" :key="item.title"><summary>{{ item.title }}<span>+</span></summary><p>{{ item.answer }}</p></details></div></section>
      <section id="download" class="download section-pad"><div data-reveal><img src="/assets/icon.webp" width="72" height="72" alt="银盐 App 图标" loading="lazy" /><p class="eyebrow">SILVER SALT / 银盐</p><h2>把今天，<br />留给<span class="green handwritten">以后的自己。</span></h2><p>你的下一张回忆，从这里开始。</p><a class="button button-dark" :href="storeUrl" target="_blank" rel="noopener noreferrer"><AppIcon name="apple" /><span><small>Download on the</small>App Store</span><AppIcon name="arrow" /></a><span class="subtle">在时光里显影 · 银盐</span></div><span class="download-decoration" aria-hidden="true">✳</span></section>
    </main>
    <footer><a class="brand" href="#"><span>银盐<small>SILVER SALT</small></span></a><p>© {{ new Date().getFullYear() }} 银盐 · 为日常留一点心情。</p><a href="#main">回到开头 <AppIcon name="up" /></a></footer>
    <dialog ref="dialog" class="video-dialog" @close="stopVideo" @click="event => { if (event.target === dialog) closeVideo() }"><div class="dialog-heading"><span>银盐 · 一段日常</span><button aria-label="关闭视频" @click="closeVideo"><AppIcon name="close" /></button></div><video ref="video" controls playsinline preload="none" poster="/assets/forest-card.webp"><source src="/assets/film.mp4" type="video/mp4" />你的浏览器不支持视频播放。</video></dialog>
  </div>
</template>
