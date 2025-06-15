export const FILTERS = [
  { key: "type", label: "임대/매매" },
  { key: "price", label: "희망가" },
  { key: "area", label: "농지면적" },
  { key: "kind", label: "농지유형" },
  { key: "crop", label: "희망작물" },
];

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
  fruits: {
    label: "과수류",
    description: "열매(과일)을 수확하는 나무 작물",
  },
  fruitVegetables: {
    label: "과채류",
    description: "열매를 식용으로 하는 채소",
  },
  leafyVegetables: {
    label: "경엽채류",
    description: "줄기와 잎 부분을 주로 식용으로 하는 채소",
  },
  rootVegetables: {
    label: "근채류",
    description: "줄기와 잎 부분을 주로 식용으로 하는 채소",
  },
  grains: {
    label: "곡류",
    description: "주로 열매(씨앗)을 식용으로 하는 작물",
  },
  medicinalHerbs: {
    label: "약초류",
    description: "한방(한의학)이나 민간요법에서 약용으로 사용하는 식물",
  },
  bulbVegetables: {
    label: "인경채류",
    description: "비늘줄기(덩이줄기)를 식용으로 하는 채소류",
  },
  oilCrops: {
    label: "유지류",
    description: "씨앗이나 열매에서 기름(식용유)을 추출할 수 있는 작물",
  },
  rootCrops: {
    label: "서류",
    description: "덩이줄기나 덩이뿌리를 식용으로 하는 탄수화물이 풍부한 작물",
  },
  beans: {
    label: "두류",
    description: "콩과 식물로, 주로 씨앗을 식용으로 하는 작물",
  },
} as const;

export const CROP_CHILD_FILTER = {
  fruits: {
    apple: "사과",
    pear: "배",
    grape: "포도",
    tangerine: "감귤",
    kiwi: "참다래",
    yuzu: "유자",
    persimmon: "단감",
    peach: "복숭아",
  },
  fruitVegetables: {
    watermelon: "수박",
    orientalMelon: "참외",
    strawberry: "딸기",
    cucumber: "오이",
    tomato: "토마토",
    pepper: "고추",
  },
  leafyVegetables: {
    napaCabbage: "배추",
    cabbage: "양배추",
    spinach: "시금치",
    lettuce: "상추",
    chives: "부추",
    greenOnion: "대파",
  },
  rootVegetables: {
    carrot: "당근",
    ginger: "생강",
  },
  grains: {
    barley: "보리",
  },
  medicinalHerbs: {
    schisandra: "오미자",
  },
  bulbVegetables: {
    onion: "양파",
    garlic: "마늘",
  },
  oilCrops: {
    sesame: "참깨",
  },
  rootCrops: {
    sweetPotato: "고구마",
  },
  beans: {
    soybean: "콩",
  },
  ginseng: {
    ginseng: "인삼",
  },
} as const;
