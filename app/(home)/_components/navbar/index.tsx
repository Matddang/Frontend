"use client";

import { useEffect, useState } from "react";
import { useFilterStore } from "@/store/FilterStore";
import { FILTERS } from "@/constants/filterOptions";
import { formatDisplayFilterText } from "@/utils/format";
import PlaceTooltip from "./PlaceTooltip";
import ResetButton from "./ResetButton";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";
import {
  isRankingPath,
  RANKING_TOOLTIP,
  RankingPath,
} from "@/constants/ranking";
import { usePathname } from "next/navigation";
import Tooltip from "@/components/common/Tooltip";
import { useUserStore } from "@/store/UserStore";

export default function NavBar() {
  const { isLogin } = useUserStore();

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [isTooltipEnabled, setIsTooltipEnabled] = useState(true); // 툴팁을 한 번만 보여줄지 여부
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // 툴팁이 현재 보여지고 있는지 여부
  const [isRankingTooltipVisible, setIsRankingTooltipVisible] = useState(false); // 랭킹 툴팁 보여지고 있는지 여부

  const filterState = useFilterStore();

  const pathname = usePathname();
  const [lastPath, setLastPath] = useState("");

  const handleClick = (key: string) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  const hasFilterValue = (key: string) => {
    return formatDisplayFilterText(key, filterState) !== "";
  };

  useEffect(() => {
    const split = pathname.split("/").at(-1);
    setLastPath(split || "");

    if (isRankingPath(split || "")) {
      setIsRankingTooltipVisible(true);
    }
  }, [pathname]);

  return (
    <div className="bg-white w-full z-10 max-h-[65px] border-b border-[#F3F3F3] flex justify-between items-center pl-5 pr-[36px] py-4 gap-[12px]">
      <div className="flex gap-[12px] whitespace-nowrap">
        {FILTERS.map((filter) => {
          if (filter.key === "place" && !isLogin) return null;

          const isActive = openFilter === filter.key;
          const hasValue = hasFilterValue(filter.key);

          return (
            <div key={filter.key} className="relative">
              <div
                className="relative"
                onMouseEnter={() => {
                  if (filter.key === "place" && isTooltipEnabled) {
                    setIsTooltipVisible(true);
                  }
                }}
              >
                <FilterButton
                  text={
                    formatDisplayFilterText(filter.key, filterState) ||
                    filter.label
                  }
                  isActive={isActive}
                  hasValue={hasValue}
                  onClick={() => handleClick(filter.key)}
                />
                {filter.key === "place" && isTooltipVisible && (
                  <PlaceTooltip
                    onClose={() => {
                      setIsTooltipEnabled(false);
                      setIsTooltipVisible(false);
                    }}
                  />
                )}
              </div>
              {isActive && (
                <div className="absolute top-full left-0 z-50 mt-5">
                  <FilterModal
                    filter={filter}
                    onApply={() => {
                      setOpenFilter(null);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <ResetButton />

      {isRankingPath(lastPath) && isRankingTooltipVisible && (
        <Tooltip
          left={404}
          title={RANKING_TOOLTIP[lastPath as RankingPath].title}
          content={RANKING_TOOLTIP[lastPath as RankingPath].content}
          onClose={() => setIsRankingTooltipVisible(false)}
        />
      )}
    </div>
  );
}
