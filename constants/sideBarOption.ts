import PopularListingImg from "@/assets/images/popular-listing.svg";
import DistributionListingImg from "@/assets/images/distribution-listing.svg";
import ProfitListingImg from "@/assets/images/profit-listing.svg";

export const RANKLISTINGS = [
  {
    type: "popular",
    image: PopularListingImg,
    alt: "수익형에게 가장 인기 많은 매물",
    label: "수익형에게 가장\n인기 많은 매물",
  },
  {
    type: "distribution",
    image: DistributionListingImg,
    alt: "유통에 유리한 조건을 가진 매물",
    label: "유통에 유리한 조건을\n가진 매물",
  },
  {
    type: "profile",
    image: ProfitListingImg,
    alt: "수익창출에 유리한 매물",
    label: "수익창출에 유리한 매물",
  },
];
