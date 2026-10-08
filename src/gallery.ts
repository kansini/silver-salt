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
    "preview": "/assets/gallery/preview/IMG_1255-e9c1e5633a98.webp",
    "width": 796,
    "height": 948,
    "src": "/assets/gallery/photo/IMG_1255.JPG"
  },
  {
    "id": "video-5C676B95-7347-45BD-B327-6FAFF21A9721",
    "type": "video",
    "title": {
      "zh": "花开会忘时间",
      "en": "Nature in motion"
    },
    "description": {
      "zh": "让风替我们翻一页，留住眼前的自然。",
      "en": "Let the breeze turn a page. Keep a moment of nature."
    },
    "preview": "/assets/gallery/preview/video-5C676B95-7347-45BD-B327-6FAFF21A9721-e8a10c1a917a.webp",
    "width": 720,
    "height": 940,
    "duration": 5.3,
    "src": "/assets/gallery/preview/video-5C676B95-7347-45BD-B327-6FAFF21A9721-e8a10c1a917a.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_5C676B95-7347-45BD-B327-6FAFF21A9721.MOV"
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
    "preview": "/assets/gallery/preview/IMG_1260-eacf159a3415.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1260.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1264-00417c523466.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1264.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1259-52e24d7fbf48.webp",
    "width": 796,
    "height": 1040,
    "src": "/assets/gallery/photo/IMG_1259.JPG"
  },
  {
    "id": "video-1A7F98F7-2C03-4C51-BE4C-2E6876559368",
    "type": "video",
    "title": {
      "zh": "一个人的散步",
      "en": "A wandering afternoon"
    },
    "description": {
      "zh": "猫、树影和缓缓流动的日常。",
      "en": "A cat, some shade, and everyday life in motion."
    },
    "preview": "/assets/gallery/preview/video-1A7F98F7-2C03-4C51-BE4C-2E6876559368-f19c56814ae9.webp",
    "width": 720,
    "height": 858,
    "duration": 5.4054,
    "src": "/assets/gallery/preview/video-1A7F98F7-2C03-4C51-BE4C-2E6876559368-f19c56814ae9.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_1A7F98F7-2C03-4C51-BE4C-2E6876559368.MOV"
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
    "preview": "/assets/gallery/preview/IMG_1272-e5e131aabb96.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1272.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1257-55cb66d2a4c9.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1257.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1267-99d204c62376.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1267.JPG"
  },
  {
    "id": "video-8E1700AF-42DD-4F0A-957C-892BCDCE4462",
    "type": "video",
    "title": {
      "zh": "风吹过的地方",
      "en": "Where the wind goes"
    },
    "description": {
      "zh": "竹叶轻轻摆动，风有了自己的形状。",
      "en": "Bamboo sways gently. The breeze takes shape."
    },
    "preview": "/assets/gallery/preview/video-8E1700AF-42DD-4F0A-957C-892BCDCE4462-8a0def0c93b0.webp",
    "width": 720,
    "height": 858,
    "duration": 4.4,
    "src": "/assets/gallery/preview/video-8E1700AF-42DD-4F0A-957C-892BCDCE4462-8a0def0c93b0.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_8E1700AF-42DD-4F0A-957C-892BCDCE4462.MOV"
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
    "preview": "/assets/gallery/preview/IMG_1279-8aacaf816daf.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1279.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1281-e86215e39498.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1281.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1282-efc0ebfcc5f9.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1282.JPG"
  },
  {
    "id": "video-4E2275BB-C2DA-4BF3-9000-1DE42D037D72",
    "type": "video",
    "title": {
      "zh": "A Walk Alone",
      "en": "A Walk Alone"
    },
    "description": {
      "zh": "有些心情，适合在独处时慢慢显影。",
      "en": "Some feelings develop best in a moment alone."
    },
    "preview": "/assets/gallery/preview/video-4E2275BB-C2DA-4BF3-9000-1DE42D037D72-6cf8d91cbcb2.webp",
    "width": 720,
    "height": 858,
    "duration": 5.138467,
    "src": "/assets/gallery/preview/video-4E2275BB-C2DA-4BF3-9000-1DE42D037D72-6cf8d91cbcb2.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_4E2275BB-C2DA-4BF3-9000-1DE42D037D72.MOV"
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
    "preview": "/assets/gallery/preview/IMG_1261-e1a462fba73d.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1261.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1262-7d9178347e4b.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1262.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1266-44338c640e7b.webp",
    "width": 796,
    "height": 948,
    "src": "/assets/gallery/photo/IMG_1266.JPG"
  },
  {
    "id": "video-D1C84AE0-6655-4F93-BA95-290C29F947BC",
    "type": "video",
    "title": {
      "zh": "路灯下的晚风",
      "en": "An evening breeze"
    },
    "description": {
      "zh": "微光与叶影，组成一段短短的诗。",
      "en": "Soft light and leaves. A little poem in motion."
    },
    "preview": "/assets/gallery/preview/video-D1C84AE0-6655-4F93-BA95-290C29F947BC-8b69130a99d2.webp",
    "width": 720,
    "height": 858,
    "duration": 4.270933,
    "src": "/assets/gallery/preview/video-D1C84AE0-6655-4F93-BA95-290C29F947BC-8b69130a99d2.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_D1C84AE0-6655-4F93-BA95-290C29F947BC.MOV"
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
    "preview": "/assets/gallery/preview/IMG_1269-8bb0103d1e2c.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1269.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1274-1509e5668dd0.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1274.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1276-97b936f43d7f.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1276.JPG"
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
    "preview": "/assets/gallery/preview/IMG_1280-fc9d1bb6586b.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1280.JPG"
  },
  {
    "id": "IMG_1284",
    "type": "photo",
    "title": {
      "zh": "暮色慢慢落下",
      "en": "Dusk Falling Slowly"
    },
    "description": {
      "zh": "走过长廊，收藏一天将尽的光。",
      "en": "The last light of the day, held in a quiet corridor."
    },
    "preview": "/assets/gallery/preview/IMG_1284-a9b5595f4b93.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1284.JPG"
  },
  {
    "id": "IMG_1285",
    "type": "photo",
    "title": {
      "zh": "今日的一小片",
      "en": "A Small Piece of Today"
    },
    "description": {
      "zh": "熟悉的小路，也值得停下来记录。",
      "en": "A familiar lane, worth pausing to remember."
    },
    "preview": "/assets/gallery/preview/IMG_1285-ec0ef9745cc4.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1285.JPG"
  },
  {
    "id": "IMG_1288",
    "type": "photo",
    "title": {
      "zh": "慵懒地看风",
      "en": "Watching the Breeze"
    },
    "description": {
      "zh": "把午后的时间，留给一只猫。",
      "en": "An afternoon kept in the company of a cat."
    },
    "preview": "/assets/gallery/preview/IMG_1288-80421e85e37a.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1288.JPG"
  },
  {
    "id": "video-0C86E37A-6740-4258-B5F2-4CD9425EBB94",
    "type": "video",
    "title": {
      "zh": "夏天快结束了",
      "en": "Summer Almost Over"
    },
    "description": {
      "zh": "绿意轻轻摇晃，留住夏天的尾声。",
      "en": "Green leaves sway gently. Keep the last days of summer."
    },
    "preview": "/assets/gallery/preview/video-0C86E37A-6740-4258-B5F2-4CD9425EBB94-026b46247ed4.webp",
    "width": 720,
    "height": 858,
    "duration": 3.136467,
    "src": "/assets/gallery/preview/video-0C86E37A-6740-4258-B5F2-4CD9425EBB94-026b46247ed4.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_0C86E37A-6740-4258-B5F2-4CD9425EBB94.MOV"
  },
  {
    "id": "IMG_1290",
    "type": "photo",
    "title": {
      "zh": "风吹过的地方",
      "en": "Where the Wind Goes"
    },
    "description": {
      "zh": "树影与门前的光，安静地留在这里。",
      "en": "Shade and light linger quietly at the doorway."
    },
    "preview": "/assets/gallery/preview/IMG_1290-403c92d21bd3.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1290.JPG"
  },
  {
    "id": "IMG_1291",
    "type": "photo",
    "title": {
      "zh": "海浪拍向峭壁",
      "en": "Waves Against the Cliff"
    },
    "description": {
      "zh": "缝隙里的一点绿，是生活的小小惊喜。",
      "en": "A little green in a crack. A small surprise in everyday life."
    },
    "preview": "/assets/gallery/preview/IMG_1291-52db3bdec755.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1291.JPG"
  },
  {
    "id": "IMG_1292",
    "type": "photo",
    "title": {
      "zh": "风从高处落下",
      "en": "The Wind Falls from Above"
    },
    "description": {
      "zh": "流水经过石阶，把声音留在记忆里。",
      "en": "Water over stone steps, a sound held in memory."
    },
    "preview": "/assets/gallery/preview/IMG_1292-eeed40add477.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1292.JPG"
  },
  {
    "id": "video-165CB1C5-915D-4A83-87F3-D2B2552DBEB0",
    "type": "video",
    "title": {
      "zh": "关于那场大雨",
      "en": "About That Rain"
    },
    "description": {
      "zh": "让雨落下的声音与画面一起留住。",
      "en": "Keep the sound and sight of falling rain."
    },
    "preview": "/assets/gallery/preview/video-165CB1C5-915D-4A83-87F3-D2B2552DBEB0-ffd2f86d9a6d.webp",
    "width": 720,
    "height": 858,
    "duration": 5.271933,
    "src": "/assets/gallery/preview/video-165CB1C5-915D-4A83-87F3-D2B2552DBEB0-ffd2f86d9a6d.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_165CB1C5-915D-4A83-87F3-D2B2552DBEB0.MOV"
  },
  {
    "id": "IMG_1293",
    "type": "photo",
    "title": {
      "zh": "海浪拍向峭壁",
      "en": "Waves Against the Cliff"
    },
    "description": {
      "zh": "换一个角度，看看石缝里的生命。",
      "en": "Another angle on the life growing between stones."
    },
    "preview": "/assets/gallery/preview/IMG_1293-ee22de544bd4.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1293.JPG"
  },
  {
    "id": "IMG_1294",
    "type": "photo",
    "title": {
      "zh": "夏天快结束了",
      "en": "Summer Almost Over"
    },
    "description": {
      "zh": "树旁的光影，像夏天留下的一封信。",
      "en": "Light beside a tree. A letter left by summer."
    },
    "preview": "/assets/gallery/preview/IMG_1294-294f02008ee2.webp",
    "width": 2388,
    "height": 3120,
    "src": "/assets/gallery/photo/IMG_1294.JPG"
  },
  {
    "id": "IMG_1295",
    "type": "photo",
    "title": {
      "zh": "回忆停在这里",
      "en": "A Memory Stays Here"
    },
    "description": {
      "zh": "舞台上的神情，也能成为一张日常的珍藏。",
      "en": "An expression on stage, kept as a treasured moment."
    },
    "preview": "/assets/gallery/preview/IMG_1295-d46554198e12.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1295.JPG"
  },
  {
    "id": "video-9A284B56-C69D-4AAF-98BD-B508814BBE67",
    "type": "video",
    "title": {
      "zh": "路灯亮起时",
      "en": "When the Streetlights Rise"
    },
    "description": {
      "zh": "从一扇小小的窗，看见城市的颜色。",
      "en": "The colors of the city through a little window."
    },
    "preview": "/assets/gallery/preview/video-9A284B56-C69D-4AAF-98BD-B508814BBE67-a94637eddb12.webp",
    "width": 720,
    "height": 858,
    "duration": 5.066667,
    "src": "/assets/gallery/preview/video-9A284B56-C69D-4AAF-98BD-B508814BBE67-a94637eddb12.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_9A284B56-C69D-4AAF-98BD-B508814BBE67.MOV"
  },
  {
    "id": "IMG_1299",
    "type": "photo",
    "title": {
      "zh": "暮色慢慢落下",
      "en": "Dusk Falling Slowly"
    },
    "description": {
      "zh": "日光与影子，把路面写成一幅画。",
      "en": "Sunlight and shadow draw a picture on the pavement."
    },
    "preview": "/assets/gallery/preview/IMG_1299-aac87227f73b.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1299.JPG"
  },
  {
    "id": "IMG_1300",
    "type": "photo",
    "title": {
      "zh": "风吹过的地方",
      "en": "Where the Wind Goes"
    },
    "description": {
      "zh": "一抹鲜红，藏在绿意之间。",
      "en": "A bright touch of red, tucked among the green."
    },
    "preview": "/assets/gallery/preview/IMG_1300-e1a462fba73d.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1300.JPG"
  },
  {
    "id": "IMG_1301",
    "type": "photo",
    "title": {
      "zh": "回忆停在这里",
      "en": "A Memory Stays Here"
    },
    "description": {
      "zh": "把流水与此刻的心情一起留下。",
      "en": "Keep the flowing water and the feeling of this moment."
    },
    "preview": "/assets/gallery/preview/IMG_1301-665e97f40c36.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1301.JPG"
  },
  {
    "id": "video-AB77497C-81B3-42F2-AF63-F18F570B0C7C",
    "type": "video",
    "title": {
      "zh": "灯还亮着",
      "en": "The Light Is Still On"
    },
    "description": {
      "zh": "竹影缓缓摆动，让这一刻多停留一会儿。",
      "en": "Bamboo sways slowly. Let this moment linger."
    },
    "preview": "/assets/gallery/preview/video-AB77497C-81B3-42F2-AF63-F18F570B0C7C-6257c7d0b785.webp",
    "width": 720,
    "height": 858,
    "duration": 4.7,
    "src": "/assets/gallery/preview/video-AB77497C-81B3-42F2-AF63-F18F570B0C7C-6257c7d0b785.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_AB77497C-81B3-42F2-AF63-F18F570B0C7C.MOV"
  },
  {
    "id": "IMG_1302",
    "type": "photo",
    "title": {
      "zh": "风停在谷底",
      "en": "The Wind Rests Below"
    },
    "description": {
      "zh": "深深浅浅的绿，让时间慢下来。",
      "en": "Layers of green let time slow down."
    },
    "preview": "/assets/gallery/preview/IMG_1302-ccbb1176ba55.webp",
    "width": 2388,
    "height": 2844,
    "src": "/assets/gallery/photo/IMG_1302.JPG"
  },
  {
    "id": "video-F7B72A2F-CE40-45C9-91F7-2206DC31AE25",
    "type": "video",
    "title": {
      "zh": "关于那场大雨",
      "en": "About That Rain"
    },
    "description": {
      "zh": "花与风一起，把日常变成短短的诗。",
      "en": "Flowers and wind turn the everyday into a little poem."
    },
    "preview": "/assets/gallery/preview/video-F7B72A2F-CE40-45C9-91F7-2206DC31AE25-1b4cce9ae2fc.webp",
    "width": 720,
    "height": 858,
    "duration": 4.6046,
    "src": "/assets/gallery/preview/video-F7B72A2F-CE40-45C9-91F7-2206DC31AE25-1b4cce9ae2fc.mp4",
    "original": "/assets/gallery/video/silver_salt_export_text_F7B72A2F-CE40-45C9-91F7-2206DC31AE25.MOV"
  }
]
