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
- 作品清单 `src/gallery.ts` 由脚本生成；中英文标题与描述在 `scripts/gallery-captions.json`，以原文件名为键。
- 更新 photo/video 素材后运行 `npm run gallery:refresh`，自动生成 WebP、MP4、视频封面并同步作品索引。需要 Python 3、Pillow、ffmpeg 和 ffprobe。保留已有作品排序，新增作品按照片/视频混排；删除的作品自动从索引移除。
- 预览文件名含原文件内容哈希，同名素材替换后自动刷新缓存；未变化的素材复用预览文件。源文件保持不变。
- 视频仅在当前作品激活时静音循环预览；全屏视频自动静音循环播放，隐藏原生播放控件；关闭或切换作品时暂停，页面回到前台时恢复播放。减少动态效果设置下不自动播放。
- 全屏照片用 GSAP 从作品卡片放大进入，关闭时收回；背景和工具栏同步渐变。全屏切换其他作品后以淡出退出。支持 Esc、中途关闭和减少动态效果偏好。先显示预览图，原图解码后无缝替换。
- 原始照片在全屏查看时加载。所有图片完整展示，不裁掉 App 的相框或文字。
- 主题与语言保存在本地；首次主题跟随系统。所有动画与监听器在卸载时清理。
- App Store 下载链接在 `src/App.vue`。

参考形式：https://huyml.co/。品牌、内容、作品素材与交互为银盐独立实现。
