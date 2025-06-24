type PositionData = {
  saleId: number;
  lat: number;
  lng: number;
  region: string;
  type: "sale" | "lease";
  price: number;
  area: number;
  kind: "field" | "paddy" | "orchard";
};

// 매물 임시 데이터
export const positions: PositionData[] = [
  // 나주시
  {
    saleId: 1,
    lat: 35.0189,
    lng: 126.7212,
    region: "나주시",
    type: "sale",
    price: 120000000,
    area: 150,
    kind: "paddy",
  },
  {
    saleId: 2,
    lat: 35.02,
    lng: 126.7225,
    region: "나주시",
    type: "lease",
    price: 80000000,
    area: 100,
    kind: "paddy",
  },
  {
    saleId: 3,
    lat: 35.016,
    lng: 126.719,
    region: "나주시",
    type: "sale",
    price: 60000000,
    area: 200,
    kind: "field",
  },
  {
    saleId: 4,
    lat: 35.0195,
    lng: 126.725,
    region: "나주시",
    type: "lease",
    price: 95000000,
    area: 130,
    kind: "orchard",
  },
  {
    saleId: 5,
    lat: 35.017,
    lng: 126.718,
    region: "나주시",
    type: "sale",
    price: 70000000,
    area: 90,
    kind: "paddy",
  },

  // 목포시
  {
    saleId: 6,
    lat: 34.8111,
    lng: 126.3927,
    region: "목포시",
    type: "lease",
    price: 110000000,
    area: 120,
    kind: "field",
  },
  {
    saleId: 7,
    lat: 34.8125,
    lng: 126.3935,
    region: "목포시",
    type: "sale",
    price: 85000000,
    area: 100,
    kind: "paddy",
  },
  {
    saleId: 8,
    lat: 34.809,
    lng: 126.391,
    region: "목포시",
    type: "lease",
    price: 50000000,
    area: 180,
    kind: "orchard",
  },

  // 무안군
  {
    saleId: 9,
    lat: 34.9833,
    lng: 126.5,
    region: "무안군",
    type: "sale",
    price: 100000000,
    area: 140,
    kind: "field",
  },
  {
    saleId: 10,
    lat: 34.98,
    lng: 126.4985,
    region: "무안군",
    type: "lease",
    price: 78000000,
    area: 110,
    kind: "paddy",
  },
];
