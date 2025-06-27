export const RANKING_TOOLTIP: Record<
  RankingPath,
  { title: string; content: string }
> = {
  popular: {
    title: "수익형에게 가장 인기 많은 매물이란?",
    content: "나와 같은 ‘수익형' 유형이 가장 많이 찜을 누른\n매물들입니다.",
  },
  distribution: {
    title: "유통에 유리한 조건을 가진 농지란? ",
    content:
      "지역 농수산물 유통센터와 가장 가까운 거리를 가진\n농지 매물들로 지역 농수산물 유통센터와 가까워\n물류비가 절감되고, 교통 조건이 좋아 판로 확보가\n용이한 입지적 장점을 가진 농지들 입니다.",
  },
  profile: {
    title: "수익 창출에 유리한 조건을 가진 농지란?",
    content:
      "수익성 시뮬레이터에서 가장 높은 순수익이 예상되는\n농지들로 단위면적당 수익이 높고, 운영 리스크는 낮으며,\n판로 확보가 용이한 농지들입니다.",
  },
};

export type RankingPath = "popular" | "distribution" | "profile";

export const isRankingPath = (path: string): path is RankingPath => {
  return ["popular", "distribution", "profile"].includes(path);
};
