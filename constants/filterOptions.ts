export const TYPE_FILTER = {
  lease: "임대",
  sale: "매매",
} as const;

export const PRICE_FILTER = [
  { value: 0, label: "0" },
  { value: 100000000, label: "1억" },
  { value: 200000000, label: "2억" },
  { value: 300000000, label: "3억 이상" },
];

export const AREA_FILTER = [
  { value: 0, label: "0" },
  { value: 1000, label: "1000" },
  { value: 2000, label: "2000" },
  { value: 3000, label: "3000평 이상" },
];

export const KIND_FILTER = {
  paddy: "답(논)",
  field: "전(밭)",
  orchard: "과수원",
} as const;

export const CROP_PARENT_FILTER = {
  fruits: "과수류",
  fruitVegetables: "과채류",
  leafyVegetables: "경엽채류",
  rootVegetables: "근채류",
  grains: "곡류",
  wildVegetables: "산채류",
  medicinalHerbs: "약초류",
  bulbVegetables: "인경채류",
  oilCrops: "유지류",
  rootCrops: "서류",
  beans: "두류",
};

export const CROP_CHILD_FILTER = {
  fruits: {
    apple: "사과",
    pear: "배",
    grape: "포도",
    kiwi: "키위",
    tangerine: "감귤",
    plum: "매실",
    yuzu: "유자",
    persimmon: "단감",
    peach: "복숭아",
    fig: "무화과",
    rubusCoreanus: "복분자",
  },
  fruitVegetables: {
    watermelon: "수박",
    orientalMelon: "참외",
    strawberry: "딸기",
    cucumber: "오이",
    tomato: "토마토",
    melon: "메론",
    pumpkin: "호박",
    eggplant: "가지",
    pepper: "고추",
    bellPepper: "피망",
  },
  leafyVegetables: {
    napaCabbage: "배추",
    cabbage: "양배추",
    spinach: "시금치",
    crownDaisy: "쑥갓",
    celery: "샐러리",
    ssukgat: "신선초",
    lettuce: "상추",
    romaine: "양상추",
    kale: "케일",
    chives: "부추",
    greenOnion: "대파",
  },
  rootVegetables: {
    carrot: "당근",
    burdock: "우엉",
    radish: "무",
    ginger: "생강",
    bellflowerRoot: "도라지",
    yam: "마",
  },
  grains: {
    rice: "쌀",
    barley: "보리",
    corn: "옥수수",
    sorghum: "수수",
    buckwheat: "메밀",
    millet: "조",
  },
  wildVegetables: {
    gomchwi: "곰취",
    chamchwi: "참취",
    gondalbi: "곤달비",
    bracken: "고사리",
  },
  medicinalHerbs: {
    astragalus: "황기",
    schisandra: "오미자",
    wolfberry: "구기자",
    angelica: "당귀",
    cornelianCherry: "산수유",
    ganghwal: "강활",
    liriope: "맥문동",
  },
  bulbVegetables: {
    onion: "양파",
    garlic: "마늘",
  },
  oilCrops: {
    sesame: "참깨",
    perilla: "들깨",
    rapeseed: "유채",
    peanut: "땅콩",
  },
  rootCrops: {
    potato: "감자",
    sweetPotato: "고구마",
  },
  beans: {
    soybean: "콩",
    paddySoybean: "논콩",
    redBean: "팥",
  },
};
