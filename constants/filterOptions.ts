export const FILTERS = [
  { key: "type", label: "임대/매매" },
  { key: "price", label: "희망가" },
  { key: "area", label: "농지면적" },
  { key: "kind", label: "농지유형" },
  { key: "crop", label: "희망작물" },
  { key: "place", label: "내 장소 기반" },
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
    1: "사과",
    2: "배",
    3: "포도",
    4: "감귤",
    5: "참다래",
    6: "유자",
    7: "단감",
    8: "복숭아",
  },
  fruitVegetables: {
    9: "수박",
    10: "참외",
    11: "딸기",
    12: "오이",
    13: "토마토",
    14: "고추",
  },
  leafyVegetables: {
    15: "배추",
    16: "양배추",
    17: "시금치",
    18: "상추",
    19: "부추",
    20: "대파",
  },
  rootVegetables: {
    21: "당근",
    22: "생강",
  },
  grains: {
    25: "보리",
  },
  medicinalHerbs: {
    29: "오미자",
  },
  bulbVegetables: {
    23: "양파",
    24: "마늘",
  },
  oilCrops: {
    28: "참깨",
  },
  rootCrops: {
    27: "고구마",
  },
  beans: {
    26: "콩",
  },
} as const;
