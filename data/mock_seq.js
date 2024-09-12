const data = [
  {
    seq: 1,
    name: '쿠쿠 밥솥',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 2,
    name: '토스터',
    description: '토스트를 만들기 위한 토스터~',
    price: 19000,
    tags: ['토스터'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg'
    ],
    favoriteCount: 0
  },
  {
    seq: 3,
    name: '화사한분위기의수련',
    description: '무료 이미지 꽃, 수련, water lily',
    price: 12000,
    tags: ['꽃', '수련', 'water lily'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724120702896/water-lily-8175845_1280.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 4,
    name: '밝은분위기의벽지와전',
    description: '무료 이미지 전등, 벽지, 인테리어',
    price: 36000,
    tags: ['전등', '벽지', '인테리어'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724119838524/pexels-colour-creation-28649-112811.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 5,
    name: '갤럭시북4',
    description: '또 다른 갤럭시를 만나보세요',
    price: 1000000,
    tags: [],
    images: [
      'https://images.samsung.com/kdp/event/sec/2024/0301_galaxy_book4_ultra/buying/slide_v7/gbu_buying_defalut_pc.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 6,
    name: '갤럭시 탭 S7',
    description: '삼성 갤럭시 탭 S7',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 7,
    name: '보스 헤드폰',
    description: '보스 노이즈 캔슬링 헤드폰 700',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png'
    ],
    favoriteCount: 12
  },
  {
    seq: 8,
    name: '사무용 의자',
    description: '편안한 사무용 의자',
    price: 120000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 9,
    name: '스니커즈',
    description: '편안한 스니커즈편안한 스니커즈',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 10,
    name: '레노버 노트북',
    description: '레노버 아이디어패드 5',
    price: 800000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 11,
    name: '갤럭시 S21',
    description: '삼성 갤럭시 S21',
    price: 600000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 8
  },
  {
    seq: 12,
    name: '아이패드',
    description: '애플 아이패드 10.2인치',
    price: 450000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png'
    ],
    favoriteCount: 15
  },
  {
    seq: 13,
    name: '퀸사이즈 침대',
    description: '퀸사이즈 침대 프레임',
    price: 500000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 14,
    name: '판다인형',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 15,
    name: '맥북 프로',
    description: '애플 맥북 프로 13인치',
    price: 1500000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 16,
    name: '초기 데이터',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 17,
    name: '초기 데이터2',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 18,
    name: '초기 데이터3',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 19,
    name: '초기 데이터4',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 20,
    name: '초기 데이터5',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 21,
    name: '테스트데이터',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 22,
    name: '테스트데이터2',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 23,
    name: '테스트데이터3',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 24,
    name: '테스트데이터4',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 25,
    name: '테스트데이터5',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 26,
    name: '검색 테스트용',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 27,
    name: '검색 테스트용2',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 28,
    name: '검색 테스트용3',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 29,
    name: '검색 테스트용4',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 30,
    name: '검색 테스트용5',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 31,
    name: '쿠쿠 밥솥',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 32,
    name: '토스터',
    description: '토스트를 만들기 위한 토스터~',
    price: 19000,
    tags: ['토스터'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg'
    ],
    favoriteCount: 0
  },
  {
    seq: 33,
    name: '화사한분위기의수련',
    description: '무료 이미지 꽃, 수련, water lily',
    price: 12000,
    tags: ['꽃', '수련', 'water lily'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724120702896/water-lily-8175845_1280.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 34,
    name: '밝은분위기의벽지와전',
    description: '무료 이미지 전등, 벽지, 인테리어',
    price: 36000,
    tags: ['전등', '벽지', '인테리어'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724119838524/pexels-colour-creation-28649-112811.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 35,
    name: '갤럭시북4',
    description: '또 다른 갤럭시를 만나보세요',
    price: 1000000,
    tags: [],
    images: [
      'https://images.samsung.com/kdp/event/sec/2024/0301_galaxy_book4_ultra/buying/slide_v7/gbu_buying_defalut_pc.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 36,
    name: '갤럭시 탭 S7',
    description: '삼성 갤럭시 탭 S7',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 37,
    name: '보스 헤드폰',
    description: '보스 노이즈 캔슬링 헤드폰 700',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png'
    ],
    favoriteCount: 12
  },
  {
    seq: 38,
    name: '사무용 의자',
    description: '편안한 사무용 의자',
    price: 120000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 39,
    name: '스니커즈',
    description: '편안한 스니커즈편안한 스니커즈',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 40,
    name: '레노버 노트북',
    description: '레노버 아이디어패드 5',
    price: 800000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 41,
    name: '갤럭시 S21',
    description: '삼성 갤럭시 S21',
    price: 600000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 8
  },
  {
    seq: 42,
    name: '아이패드',
    description: '애플 아이패드 10.2인치',
    price: 450000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png'
    ],
    favoriteCount: 15
  },
  {
    seq: 43,
    name: '퀸사이즈 침대',
    description: '퀸사이즈 침대 프레임',
    price: 500000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 44,
    name: '판다인형',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 45,
    name: '맥북 프로',
    description: '애플 맥북 프로 13인치',
    price: 1500000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 46,
    name: '초기 데이터',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 47,
    name: '초기 데이터2',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 48,
    name: '초기 데이터3',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 49,
    name: '초기 데이터4',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 50,
    name: '초기 데이터5',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 51,
    name: '테스트데이터',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 52,
    name: '테스트데이터2',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 53,
    name: '테스트데이터3',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 54,
    name: '테스트데이터4',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 55,
    name: '테스트데이터5',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 56,
    name: '검색 테스트용',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 57,
    name: '검색 테스트용2',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 58,
    name: '검색 테스트용3',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 59,
    name: '검색 테스트용4',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 60,
    name: '검색 테스트용5',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 61,
    name: '쿠쿠 밥솥',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 62,
    name: '토스터',
    description: '토스트를 만들기 위한 토스터~',
    price: 19000,
    tags: ['토스터'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg'
    ],
    favoriteCount: 0
  },
  {
    seq: 63,
    name: '화사한분위기의수련',
    description: '무료 이미지 꽃, 수련, water lily',
    price: 12000,
    tags: ['꽃', '수련', 'water lily'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724120702896/water-lily-8175845_1280.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 64,
    name: '밝은분위기의벽지와전',
    description: '무료 이미지 전등, 벽지, 인테리어',
    price: 36000,
    tags: ['전등', '벽지', '인테리어'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724119838524/pexels-colour-creation-28649-112811.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 65,
    name: '갤럭시북4',
    description: '또 다른 갤럭시를 만나보세요',
    price: 1000000,
    tags: [],
    images: [
      'https://images.samsung.com/kdp/event/sec/2024/0301_galaxy_book4_ultra/buying/slide_v7/gbu_buying_defalut_pc.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 66,
    name: '갤럭시 탭 S7',
    description: '삼성 갤럭시 탭 S7',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 67,
    name: '보스 헤드폰',
    description: '보스 노이즈 캔슬링 헤드폰 700',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png'
    ],
    favoriteCount: 12
  },
  {
    seq: 68,
    name: '사무용 의자',
    description: '편안한 사무용 의자',
    price: 120000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 69,
    name: '스니커즈',
    description: '편안한 스니커즈편안한 스니커즈',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 70,
    name: '레노버 노트북',
    description: '레노버 아이디어패드 5',
    price: 800000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 71,
    name: '갤럭시 S21',
    description: '삼성 갤럭시 S21',
    price: 600000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 8
  },
  {
    seq: 72,
    name: '아이패드',
    description: '애플 아이패드 10.2인치',
    price: 450000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png'
    ],
    favoriteCount: 15
  },
  {
    seq: 73,
    name: '퀸사이즈 침대',
    description: '퀸사이즈 침대 프레임',
    price: 500000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 74,
    name: '판다인형',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 75,
    name: '맥북 프로',
    description: '애플 맥북 프로 13인치',
    price: 1500000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 76,
    name: '초기 데이터',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 77,
    name: '초기 데이터2',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 78,
    name: '초기 데이터3',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 79,
    name: '초기 데이터4',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 80,
    name: '초기 데이터5',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 81,
    name: '테스트데이터',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 82,
    name: '테스트데이터2',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 83,
    name: '테스트데이터3',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 84,
    name: '테스트데이터4',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 85,
    name: '테스트데이터5',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 86,
    name: '검색 테스트용',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 87,
    name: '검색 테스트용2',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 88,
    name: '검색 테스트용3',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 89,
    name: '검색 테스트용4',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 90,
    name: '검색 테스트용5',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 91,
    name: '쿠쿠 밥솥',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 92,
    name: '토스터',
    description: '토스트를 만들기 위한 토스터~',
    price: 19000,
    tags: ['토스터'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/72/1724836584916/2.jpg'
    ],
    favoriteCount: 0
  },
  {
    seq: 93,
    name: '화사한분위기의수련',
    description: '무료 이미지 꽃, 수련, water lily',
    price: 12000,
    tags: ['꽃', '수련', 'water lily'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724120702896/water-lily-8175845_1280.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 94,
    name: '밝은분위기의벽지와전',
    description: '무료 이미지 전등, 벽지, 인테리어',
    price: 36000,
    tags: ['전등', '벽지', '인테리어'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1724119838524/pexels-colour-creation-28649-112811.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 95,
    name: '갤럭시북4',
    description: '또 다른 갤럭시를 만나보세요',
    price: 1000000,
    tags: [],
    images: [
      'https://images.samsung.com/kdp/event/sec/2024/0301_galaxy_book4_ultra/buying/slide_v7/gbu_buying_defalut_pc.jpg'
    ],
    favoriteCount: 1
  },
  {
    seq: 96,
    name: '갤럭시 탭 S7',
    description: '삼성 갤럭시 탭 S7',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991844193/5146532.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 97,
    name: '보스 헤드폰',
    description: '보스 노이즈 캔슬링 헤드폰 700',
    price: 350000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991827255/3514562.png'
    ],
    favoriteCount: 12
  },
  {
    seq: 98,
    name: '사무용 의자',
    description: '편안한 사무용 의자',
    price: 120000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991812368/2313561.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 99,
    name: '스니커즈',
    description: '편안한 스니커즈편안한 스니커즈',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 100,
    name: '레노버 노트북',
    description: '레노버 아이디어패드 5',
    price: 800000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991798558/321351.png'
    ],
    favoriteCount: 4
  },
  {
    seq: 101,
    name: '갤럭시 S21',
    description: '삼성 갤럭시 S21',
    price: 600000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 8
  },
  {
    seq: 102,
    name: '아이패드',
    description: '애플 아이패드 10.2인치',
    price: 450000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png'
    ],
    favoriteCount: 15
  },
  {
    seq: 103,
    name: '퀸사이즈 침대',
    description: '퀸사이즈 침대 프레임',
    price: 500000,
    tags: ['가구'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991744735/2113.png'
    ],
    favoriteCount: 6
  },
  {
    seq: 104,
    name: '판다인형',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 105,
    name: '맥북 프로',
    description: '애플 맥북 프로 13인치',
    price: 1500000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 106,
    name: '초기 데이터',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 107,
    name: '초기 데이터2',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 108,
    name: '초기 데이터3',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 109,
    name: '초기 데이터4',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 110,
    name: '초기 데이터5',
    description: '초기 데이터입니다. 초기 데이터입니다.',
    price: 100000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991853452/5389615.png'
    ],
    favoriteCount: 10
  },
  {
    seq: 111,
    name: '테스트데이터',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 112,
    name: '테스트데이터2',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 113,
    name: '테스트데이터3',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 114,
    name: '테스트데이터4',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 115,
    name: '테스트데이터5',
    description: '귀여운 판다인형입니다',
    price: 30000,
    tags: [],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991725132/233.png'
    ],
    favoriteCount: 7
  },
  {
    seq: 116,
    name: '검색 테스트용',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 117,
    name: '검색 테스트용2',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 118,
    name: '검색 테스트용3',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 119,
    name: '검색 테스트용4',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  },
  {
    seq: 120,
    name: '검색 테스트용5',
    description: '쿠쿠하세요~~쿠쿠하세요~~',
    price: 310000,
    tags: ['쿠쿠쿠쿠쿸'],
    images: [
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/92/1725209779217/CRP-DHP0610FD.png'
    ],
    favoriteCount: 0
  }
];

export default data;
