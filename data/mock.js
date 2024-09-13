const mockData = [
  {
    id: 188,
    name: "쿠쿠 밥솥",
    description: "쿠쿠하세요~~",
    price: 310000,
    tags: ["쿠쿠쿠쿠쿸"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png"
    ],
    ownerId: 92,
    favoriteCount: 0,
    createdAt: "2024-09-01T15:56:53.858Z",
    updatedAt: "2024-09-02T01:15:56.841Z"
  },
  {
    id: 153,
    name: "토스터",
    description: "토스트를 만들기 위한 토스터~",
    price: 19000,
    tags: ["토스터"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg"
    ],
    ownerId: 72,
    favoriteCount: 0,
    createdAt: "2024-08-27T12:26:55.629Z",
    updatedAt: "2024-08-30T10:42:33.978Z"
  },
  {
    id: 146,
    name: "상품 이름",
    description: "string",
    price: 0,
    tags: [],
    images: ["https://example.com/..."],
    ownerId: 78,
    favoriteCount: 1,
    createdAt: "2024-08-25T17:41:10.901Z",
    updatedAt: "2024-09-04T08:20:57.019Z"
  },
  {
    id: 136,
    name: "화사한 분위기의 수련",
    description: "무료 이미지 꽃, 수련, water lily",
    price: 12000,
    tags: ["꽃", "수련", "water lily"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724120702896/water-lily-8175845_1280.jpg"
    ],
    ownerId: 36,
    favoriteCount: 1,
    createdAt: "2024-08-20T02:26:50.914Z",
    updatedAt: "2024-08-21T02:06:50.311Z"
  },
  {
    id: 135,
    name: "밝은 분위기의 벽지와 전등",
    description: "무료 이미지 전등, 벽지, 인테리어",
    price: 36000,
    tags: ["전등", "벽지", "인테리어"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724119838524/pexels-colour-creation-28649-112811.jpg"
    ],
    ownerId: 36,
    favoriteCount: 1,
    createdAt: "2024-08-20T02:12:42.228Z",
    updatedAt: "2024-08-21T02:06:47.586Z"
  },
  {
    id: 134,
    name: "갤럭시북4",
    description: "또 다른 갤럭시를 만나보세요",
    price: 1000000,
    tags: [],
    images: [
      "https://images.samsung.com/kdp/event/sec/2024/0301_galaxy_book4_ultra/buying/slide_v7/gbu_buying_defalut_pc.jpg"
    ],
    ownerId: 29,
    favoriteCount: 1,
    createdAt: "2024-08-16T02:27:54.293Z",
    updatedAt: "2024-08-21T02:06:41.073Z"
  },
  {
    id: 133,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 132,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 131,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 130,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 129,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 128,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 127,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 126,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 125,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 124,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 123,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 122,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 121,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 120,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 119,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 118,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 117,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 116,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 115,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 114,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 113,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 112,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 111,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 110,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 109,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 108,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 107,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 106,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 105,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 104,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 103,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 102,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 101,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 100,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 99,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 98,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 97,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 96,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 95,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 94,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 93,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 92,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 91,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 90,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 89,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 88,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 87,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 86,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 85,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 84,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 83,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 82,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 81,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 80,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 79,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 78,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 77,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 76,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 75,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 74,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 73,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 72,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 71,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 70,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 69,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 68,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 67,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 66,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 65,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 64,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 63,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 62,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 61,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 60,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 59,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 58,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 57,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 56,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 55,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 54,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 53,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 52,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 51,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 50,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 49,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 48,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 47,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 46,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 45,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 44,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 43,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 42,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 41,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 40,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 1,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-08-08T03:07:23.555Z"
  },
  {
    id: 39,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 38,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 37,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 36,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 35,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 34,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 33,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 32,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 31,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 30,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 29,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 28,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 27,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 26,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 25,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 24,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 23,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 22,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 21,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 20,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 19,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 18,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 17,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 16,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 15,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 14,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 13,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 12,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 11,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 10,
    name: "맥북 프로",
    description: "애플 맥북 프로 13인치",
    price: 1500000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 9,
    name: "스니커즈",
    description: "편안한 스니커즈",
    price: 100000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png"
    ],
    ownerId: 1,
    favoriteCount: 10,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 8,
    name: "갤럭시 탭 S7",
    description: "삼성 갤럭시 탭 S7",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 7,
    name: "보스 헤드폰",
    description: "보스 노이즈 캔슬링 헤드폰 700",
    price: 350000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png"
    ],
    ownerId: 1,
    favoriteCount: 12,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 6,
    name: "사무용 의자",
    description: "편안한 사무용 의자",
    price: 120000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 5,
    name: "레노버 노트북",
    description: "레노버 아이디어패드 5",
    price: 800000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png"
    ],
    ownerId: 1,
    favoriteCount: 4,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 4,
    name: "갤럭시 S21",
    description: "삼성 갤럭시 S21",
    price: 600000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png"
    ],
    ownerId: 1,
    favoriteCount: 8,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 3,
    name: "아이패드",
    description: "애플 아이패드 10.2인치",
    price: 450000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png"
    ],
    ownerId: 1,
    favoriteCount: 15,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 2,
    name: "퀸사이즈 침대",
    description: "퀸사이즈 침대 프레임",
    price: 500000,
    tags: ["가구"],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png"
    ],
    ownerId: 1,
    favoriteCount: 6,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  },
  {
    id: 1,
    name: "판다인형",
    description: "귀여운 판다인형입니다",
    price: 30000,
    tags: [],
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png"
    ],
    ownerId: 1,
    favoriteCount: 7,
    createdAt: "2024-07-29T05:45:03.249Z",
    updatedAt: "2024-07-29T05:45:03.249Z"
  }
];

export default mockData;
