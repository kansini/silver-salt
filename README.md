# Silver Salt · 日常作品集

Vue 3 / TypeScript / Vite / SCSS / GSAP ScrollTrigger。

```sh
yarn dev
yarn build
yarn preview
```

以 App 实拍的照片和视频为核心，采用固定信息栏、中央错位作品流、滚动序号与作品索引。支持照片/视频筛选、索引跳转、全屏作品查看、键盘左右切换、深浅色和中英文。

- 原素材位于 `public/assets/gallery/photo` 和 `video`，保持原文件。
- 轻量 WebP 预览、H.264 MP4 及视频封面位于 `public/assets/gallery/preview`。
- 作品清单与中英文标题在 `src/gallery.ts`，加入素材时同步更新清单。
- 视频仅在当前作品激活时静音循环预览；全屏播放器由用户控制播放、声音。减少动态效果设置下不自动播放。
- 原始照片在全屏查看时加载。所有图片完整展示，不裁掉 App 的相框或文字。
- 主题与语言保存在本地；首次主题跟随系统。所有动画与监听器在卸载时清理。
- App Store 下载链接在 `src/App.vue`。

参考形式：https://huyml.co/。品牌、内容、作品素材与交互为银盐独立实现。
