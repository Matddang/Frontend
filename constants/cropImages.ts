import CarrotImg from "@/assets/images/crops/carrot.jpg";
import CornImg from "@/assets/images/crops/corn.jpg";
import GrapeImg from "@/assets/images/crops/grape.jpg";
import KidneyBeanImg from "@/assets/images/crops/kidney-bean.jpg";
import LettuceImg from "@/assets/images/crops/lettuce.jpg";
import OmijaImg from "@/assets/images/crops/omija.jpg";
import OnionImg from "@/assets/images/crops/onion.jpg";
import SesameImg from "@/assets/images/crops/sesame.png";
import StrawberryImg from "@/assets/images/crops/strawberry.jpg";
import SweetPotatoImg from "@/assets/images/crops/sweet-potato.jpg";
import BrakenImg from "@/assets/images/crops/bracken.png";
import { StaticImageData } from "next/image";

export const CROP_IMAGES: Record<
  string,
  { names: string[]; ids: number[]; image: StaticImageData }
> = {
  fruits: {
    names: ["포도", "사과", "배", "감귤", "참다래", "유자", "단감", "복숭아"],
    ids: [1, 2, 3, 4, 5, 6, 7, 8],
    image: GrapeImg,
  },
  fruitVegetables: {
    names: ["딸기", "수박", "참외", "오이", "토마토", "고추"],
    ids: [9, 10, 11, 12, 13, 14],
    image: StrawberryImg,
  },
  leafyVegetables: {
    names: ["상추", "배추", "양배추", "시금치", "부추", "대파"],
    ids: [15, 16, 17, 18, 19, 20],
    image: LettuceImg,
  },
  rootVegetables: {
    names: ["당근", "생강"],
    ids: [21, 22],
    image: CarrotImg,
  },
  bulbVegetables: {
    names: ["양파", "마늘"],
    ids: [23, 24],
    image: OnionImg,
  },
  grains: {
    names: ["옥수수", "보리"],
    ids: [25],
    image: CornImg,
  },
  beans: {
    names: ["팥", "콩"],
    ids: [26],
    image: KidneyBeanImg,
  },
  rootCrops: {
    names: ["고구마"],
    ids: [27],
    image: SweetPotatoImg,
  },
  oilCrops: {
    names: ["참깨"],
    ids: [28],
    image: SesameImg,
  },
  medicinalHerbs: {
    names: ["오미자"],
    ids: [29],
    image: OmijaImg,
  },
  wildVegetable: {
    names: ["고사리", "인삼"],
    ids: [],
    image: BrakenImg,
  },
};

// 각 하위 작물 ID 별로 이미지 매핑 생성
export const CROP_IMAGE_MAP = Object.fromEntries(
  Object.values(CROP_IMAGES).flatMap(({ ids, image }) =>
    ids.map((id) => [id, image]),
  ),
);

// 각 하위 작물 name 별로 이미지 매핑 생성
export const CROP_NAME_IMAGE_MAP = Object.fromEntries(
  Object.values(CROP_IMAGES).flatMap(({ names, image }) =>
    names.map((name) => [name, image]),
  ),
);
