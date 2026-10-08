export type GalleryItem = {
  id: string; type: 'photo' | 'video'; title: { zh: string; en: string }; description: { zh: string; en: string }; src: string; preview: string; original?: string; width: number; height: number; duration?: number
}
export const gallery: GalleryItem[] = [
  {
    "id": "IMG_1255",
    "type": "photo",
    "title": {
      "zh": "小屋藏着冬天",
      "en": "A quiet corner"
    },
    "description": {
      "zh": "光穿过屋檐，落在慢下来的日子里。",
      "en": "Light through the rafters. A day taking its time."
    },
    "src": "/assets/gallery/photo/IMG_1255.JPG",
    "preview": "/assets/gallery/preview/IMG_1255.webp",
    "width": 796,
    "height": 948
  },
  {
    "id": "video-2",
    "type": "video",
    "title": {
      "zh": "花开会忘时间",
      "en": "Nature in motion"
    },
    "description": {
      "zh": "让风替我们翻一页，留住眼前的自然。",
      "en": "Let the breeze turn a page. Keep a moment of nature."
    },
    "src": "/assets/gallery/preview/video-2.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_5C676B95-7347-45BD-B327-6FAFF21A9721.MOV",
    "preview": "/assets/gallery/preview/video-2.webp",
    "width": 796,
    "height": 1040,
    "duration": 5.3
  },
  {
    "id": "IMG_1260",
    "type": "photo",
    "title": {
      "zh": "声音藏在安谧",
      "en": "Still waters"
    },
    "description": {
      "zh": "水面很安静，风景也有了回声。",
      "en": "Still water, and an echo of the world around it."
    },
    "src": "/assets/gallery/photo/IMG_1260.JPG",
    "preview": "/assets/gallery/preview/IMG_1260.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1264",
    "type": "photo",
    "title": {
      "zh": "花开在安静处",
      "en": "Quiet bloom"
    },
    "description": {
      "zh": "不用赶路，花正在这里盛开。",
      "en": "No need to hurry. The flowers are already here."
    },
    "src": "/assets/gallery/photo/IMG_1264.JPG",
    "preview": "/assets/gallery/preview/IMG_1264.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1259",
    "type": "photo",
    "title": {
      "zh": "是熟悉的人在拍",
      "en": "A call from the past"
    },
    "description": {
      "zh": "一抹红，接通旧时光。",
      "en": "A touch of red. A connection to another time."
    },
    "src": "/assets/gallery/photo/IMG_1259.JPG",
    "preview": "/assets/gallery/preview/IMG_1259.webp",
    "width": 796,
    "height": 1040
  },
  {
    "id": "video-0",
    "type": "video",
    "title": {
      "zh": "一个人的散步",
      "en": "A wandering afternoon"
    },
    "description": {
      "zh": "猫、树影和缓缓流动的日常。",
      "en": "A cat, some shade, and everyday life in motion."
    },
    "src": "/assets/gallery/preview/video-0.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_1A7F98F7-2C03-4C51-BE4C-2E6876559368.MOV",
    "preview": "/assets/gallery/preview/video-0.webp",
    "width": 796,
    "height": 948,
    "duration": 5.41
  },
  {
    "id": "IMG_1272",
    "type": "photo",
    "title": {
      "zh": "猫在等风来",
      "en": "Waiting for the breeze"
    },
    "description": {
      "zh": "午后的故事，留给路边的猫。",
      "en": "An afternoon story, left to the cats along the way."
    },
    "src": "/assets/gallery/photo/IMG_1272.JPG",
    "preview": "/assets/gallery/preview/IMG_1272.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1257",
    "type": "photo",
    "title": {
      "zh": "留住停在这里",
      "en": "Still life"
    },
    "description": {
      "zh": "红色的枝叶，把一面墙变成了风景。",
      "en": "A red branch turns a quiet wall into a view."
    },
    "src": "/assets/gallery/photo/IMG_1257.JPG",
    "preview": "/assets/gallery/preview/IMG_1257.webp",
    "width": 2388,
    "height": 3120
  },
  {
    "id": "IMG_1267",
    "type": "photo",
    "title": {
      "zh": "抬头",
      "en": "Look up"
    },
    "description": {
      "zh": "有些风景，抬头才会遇见。",
      "en": "Some surprises are waiting just above you."
    },
    "src": "/assets/gallery/photo/IMG_1267.JPG",
    "preview": "/assets/gallery/preview/IMG_1267.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1268",
    "type": "photo",
    "title": {
      "zh": "窗外的奇遇",
      "en": "An unexpected guest"
    },
    "description": {
      "zh": "在熟悉的街角，遇见不寻常的身影。",
      "en": "An unusual guest at a familiar street corner."
    },
    "src": "/assets/gallery/photo/IMG_1268.JPG",
    "preview": "/assets/gallery/preview/IMG_1268.webp",
    "width": 1290,
    "height": 2796
  },
  {
    "id": "video-3",
    "type": "video",
    "title": {
      "zh": "风吹过的地方",
      "en": "Where the wind goes"
    },
    "description": {
      "zh": "竹叶轻轻摆动，风有了自己的形状。",
      "en": "Bamboo sways gently. The breeze takes shape."
    },
    "src": "/assets/gallery/preview/video-3.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_8E1700AF-42DD-4F0A-957C-892BCDCE4462.MOV",
    "preview": "/assets/gallery/preview/video-3.webp",
    "width": 796,
    "height": 948,
    "duration": 4.4
  },
  {
    "id": "IMG_1279",
    "type": "photo",
    "title": {
      "zh": "山野正在回声",
      "en": "Among the trees"
    },
    "description": {
      "zh": "一片树影，也是一段可以重逢的记忆。",
      "en": "A patch of shade. A memory to meet again."
    },
    "src": "/assets/gallery/photo/IMG_1279.JPG",
    "preview": "/assets/gallery/preview/IMG_1279.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1281",
    "type": "photo",
    "title": {
      "zh": "春来的是雨",
      "en": "After the rain"
    },
    "description": {
      "zh": "远处的山色，近处的心情。",
      "en": "Distant hills. A feeling close to home."
    },
    "src": "/assets/gallery/photo/IMG_1281.JPG",
    "preview": "/assets/gallery/preview/IMG_1281.webp",
    "width": 2388,
    "height": 3120
  },
  {
    "id": "IMG_1282",
    "type": "photo",
    "title": {
      "zh": "留住停在这里",
      "en": "An afternoon indoors"
    },
    "description": {
      "zh": "台灯、木柜，与不必出门的下午。",
      "en": "A lamp, a wooden cabinet, an afternoon at home."
    },
    "src": "/assets/gallery/photo/IMG_1282.JPG",
    "preview": "/assets/gallery/preview/IMG_1282.webp",
    "width": 2388,
    "height": 3120
  },
  {
    "id": "video-1",
    "type": "video",
    "title": {
      "zh": "A Walk Alone",
      "en": "A Walk Alone"
    },
    "description": {
      "zh": "有些心情，适合在独处时慢慢显影。",
      "en": "Some feelings develop best in a moment alone."
    },
    "src": "/assets/gallery/preview/video-1.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_4E2275BB-C2DA-4BF3-9000-1DE42D037D72.MOV",
    "preview": "/assets/gallery/preview/video-1.webp",
    "width": 796,
    "height": 948,
    "duration": 5.135
  },
  {
    "id": "IMG_1261",
    "type": "photo",
    "title": {
      "zh": "风吹过的地方",
      "en": "A little red"
    },
    "description": {
      "zh": "在一片绿里，发现一点意外的红。",
      "en": "An unexpected splash of red in a sea of green."
    },
    "src": "/assets/gallery/photo/IMG_1261.JPG",
    "preview": "/assets/gallery/preview/IMG_1261.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1262",
    "type": "photo",
    "title": {
      "zh": "一个人的散步",
      "en": "A playful afternoon"
    },
    "description": {
      "zh": "偶然遇见的色彩，像一个小小的惊喜。",
      "en": "A chance encounter with color. A small surprise."
    },
    "src": "/assets/gallery/photo/IMG_1262.JPG",
    "preview": "/assets/gallery/preview/IMG_1262.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1263",
    "type": "photo",
    "title": {
      "zh": "草地上的想象",
      "en": "A little daydream"
    },
    "description": {
      "zh": "把眼前的趣味，放进一张纸的留白。",
      "en": "A playful moment, held in a little space on paper."
    },
    "src": "/assets/gallery/photo/IMG_1263.JPG",
    "preview": "/assets/gallery/preview/IMG_1263.webp",
    "width": 1290,
    "height": 2796
  },
  {
    "id": "IMG_1266",
    "type": "photo",
    "title": {
      "zh": "路过的边界",
      "en": "On the way"
    },
    "description": {
      "zh": "脚下的线条，是城市写给路人的字。",
      "en": "Lines underfoot. A little note from the city."
    },
    "src": "/assets/gallery/photo/IMG_1266.JPG",
    "preview": "/assets/gallery/preview/IMG_1266.webp",
    "width": 796,
    "height": 948
  },
  {
    "id": "video-4",
    "type": "video",
    "title": {
      "zh": "路灯下的晚风",
      "en": "An evening breeze"
    },
    "description": {
      "zh": "微光与叶影，组成一段短短的诗。",
      "en": "Soft light and leaves. A little poem in motion."
    },
    "src": "/assets/gallery/preview/video-4.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_D1C84AE0-6655-4F93-BA95-290C29F947BC.MOV",
    "preview": "/assets/gallery/preview/video-4.webp",
    "width": 796,
    "height": 948,
    "duration": 4.266667
  },
  {
    "id": "IMG_1269",
    "type": "photo",
    "title": {
      "zh": "一步之间",
      "en": "Between steps"
    },
    "description": {
      "zh": "走走停停，也能看见生活的纹理。",
      "en": "Pause between steps and see the texture of everyday life."
    },
    "src": "/assets/gallery/photo/IMG_1269.JPG",
    "preview": "/assets/gallery/preview/IMG_1269.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1274",
    "type": "photo",
    "title": {
      "zh": "那些遇见的角落",
      "en": "A little wilderness"
    },
    "description": {
      "zh": "阳光落在荒草上，时间变得柔软。",
      "en": "Sunlight on wild grass. Time softens."
    },
    "src": "/assets/gallery/photo/IMG_1274.JPG",
    "preview": "/assets/gallery/preview/IMG_1274.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1275",
    "type": "photo",
    "title": {
      "zh": "林间的切片",
      "en": "A piece of green"
    },
    "description": {
      "zh": "在层层绿意里，留下自己的小小窗口。",
      "en": "A little window of your own, surrounded by green."
    },
    "src": "/assets/gallery/photo/IMG_1275.JPG",
    "preview": "/assets/gallery/preview/IMG_1275.webp",
    "width": 1290,
    "height": 2796
  },
  {
    "id": "video-5",
    "type": "video",
    "title": {
      "zh": "绿意在纸上流动",
      "en": "A moving memory"
    },
    "description": {
      "zh": "照片与背景一起，把这一刻缓缓展开。",
      "en": "A photo and its surroundings unfold the moment together."
    },
    "src": "/assets/gallery/preview/video-5.mp4",
    "original": "/assets/gallery/video/silver_salt_full_composition_video_0016B014-49BF-47E5-A20F-C008D4881E6B.MOV",
    "preview": "/assets/gallery/preview/video-5.webp",
    "width": 1290,
    "height": 2796,
    "duration": 4.266667
  },
  {
    "id": "IMG_1265",
    "type": "photo",
    "title": {
      "zh": "绿意的来信",
      "en": "A letter in green"
    },
    "description": {
      "zh": "把一朵花，连同它身旁的风一起收藏。",
      "en": "Keep a flower, and the breeze beside it."
    },
    "src": "/assets/gallery/photo/IMG_1265.JPG",
    "preview": "/assets/gallery/preview/IMG_1265.webp",
    "width": 1290,
    "height": 2796
  },
  {
    "id": "IMG_1276",
    "type": "photo",
    "title": {
      "zh": "留住停在这里",
      "en": "A small surprise"
    },
    "description": {
      "zh": "认真看看，日常藏着许多可爱。",
      "en": "Look a little closer. Everyday life is full of little joys."
    },
    "src": "/assets/gallery/photo/IMG_1276.JPG",
    "preview": "/assets/gallery/preview/IMG_1276.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "IMG_1280",
    "type": "photo",
    "title": {
      "zh": "风吹过的地方",
      "en": "Traces of the day"
    },
    "description": {
      "zh": "石阶与草地之间，藏着走过的时间。",
      "en": "Between the stone steps and the grass, traces of time."
    },
    "src": "/assets/gallery/photo/IMG_1280.JPG",
    "preview": "/assets/gallery/preview/IMG_1280.webp",
    "width": 2388,
    "height": 2844
  },
  {
    "id": "video-6",
    "type": "video",
    "title": {
      "zh": "竹林间的来信",
      "en": "A letter from the grove"
    },
    "description": {
      "zh": "让一张静静的照片，也有风经过。",
      "en": "Let a breeze pass through a quiet photograph."
    },
    "src": "/assets/gallery/preview/video-6.mp4",
    "original": "/assets/gallery/video/silver_salt_full_composition_video_6A10DFB3-9024-490F-9163-9247668F104D.MOV",
    "preview": "/assets/gallery/preview/video-6.webp",
    "width": 1290,
    "height": 2796,
    "duration": 4.4
  }
]
