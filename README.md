# 银盐 Silver Salt · 推广落地页

Vue 3 + TypeScript + Vite + SCSS，动画使用 GSAP / ScrollTrigger。

```sh
yarn dev
yarn build
yarn preview
```

页面包括品牌介绍、交互式胶片调色和相框示意、App 界面、作品收藏、常见问题、推广视频及 App Store 下载入口。所有素材存储在 `public/assets`，无需外部图片服务。

GSAP 动画使用 `matchMedia` 适配减少动态效果设置；卸载时清理动画与 ScrollTrigger。移动端提供折叠菜单，视频使用原生 dialog 支持 Escape 关闭和焦点管理，关闭时暂停播放。

网页调色通过 CSS filter 模拟，不代表 App 实际 LUT。App Store 地址在 `src/App.vue` 中配置。视频只在用户打开时加载，不自动播放。上线到域名后可补充绝对地址形式的 `og:url` 和 `og:image`。
