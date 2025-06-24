import { landUses, restrictionAreas } from "@/mock/listing";

// 해시 함수(djb2)
const hashStringToNumber = (str: string): number => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
};

// 결정적 랜덤 함수
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// id에 따라 고정된 랜덤 데이터를 리턴하는 함수
export const getDeterministicLandUseInfo = (id: string) => {
  const seed = hashStringToNumber(id);
  const rand = seededRandom(seed);

  const landUse = landUses[Math.floor(rand * landUses.length)];
  const restrictionArea =
    restrictionAreas[
      Math.floor(seededRandom(seed + 1) * restrictionAreas.length)
    ];

  return { landUse, restrictionArea };
};
