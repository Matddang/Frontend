export type Property = {
  area: number;
  imgUrl: string;
  landCategory: string;
  landType: string;
  mainCrop: string;
  officialPrice: number;
  price: number;
  profit: number;
  regDate: string;
  saleAddr: string;
  saleCategory: string;
  saleId: number;
  wgsX: number;
  wgsY: number;
};

export type CompareHistoryType = {
  compareTime: string;
  sale1: {
    sale: Property[];
  };
  sale2: {
    sale: Property[];
  };
};
