export const TYPE_FILTER = {
  lease: "임대",
  sale: "매매",
};

export const PRICE_FILTER = [
  { value: 0, label: "0" },
  { value: 5000000, label: "500만원" },
  { value: 200000000, label: "2억" },
  { value: 300000000, label: "3억 이상" },
];

export const AREA_FILTER = [
  { value: 0, label: "0" },
  { value: 1000, label: "1000" },
  { value: 3000, label: "2000" },
  { value: 5000, label: "3000평 이상" },
];

export const KIND_FILTER = {
  paddy: "답(논)",
  field: "전(밭)",
  orchard: "과수원",
};
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
};
