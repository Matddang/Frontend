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
import { StaticImageData } from "next/image";

export const CROP_IMAGES: Record<
  string,
  { ids: number[]; image: StaticImageData }
> = {
  fruits: {
    ids: [1, 2, 3, 4, 5, 6, 7, 8],
    image: GrapeImg,
  },
  fruitVegetables: {
    ids: [9, 10, 11, 12, 13, 14],
    image: StrawberryImg,
  },
  leafyVegetables: {
    ids: [15, 16, 17, 18, 19, 20],
    image: LettuceImg,
  },
  rootVegetables: {
    ids: [21, 22],
    image: CarrotImg,
  },
  bulbVegetables: {
    ids: [23, 24],
    image: OnionImg,
  },
  grains: {
    ids: [25],
    image: CornImg,
  },
  beans: {
    ids: [26],
    image: KidneyBeanImg,
  },
  rootCrops: {
    ids: [27],
    image: SweetPotatoImg,
  },
  oilCrops: {
    ids: [28],
    image: SesameImg,
  },
  medicinalHerbs: {
    ids: [29],
    image: OmijaImg,
  },
};

// 각 하위 작물 ID 별로 이미지 매핑 생성
export const CROP_IMAGE_MAP = Object.fromEntries(
  Object.values(CROP_IMAGES).flatMap(({ ids, image }) =>
    ids.map((id) => [id, image]),
  ),
);
