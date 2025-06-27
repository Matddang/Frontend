import { useRouter } from "next/navigation";
import { useFilterStore } from "@/store/FilterStore";
import { updateFilterQuery } from "@/utils/filterQuery";
import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";

export default function ResetButton() {
  const router = useRouter();
  const { setType, setPrice, setArea, setKind, setCrop, setPlace } =
    useFilterStore();

  const handleAllReset = () => {
    setType(null);
    setPrice({
      min: PRICE_FILTER[0].value,
      max: PRICE_FILTER.at(-1)!.value,
    });
    setArea({
      min: AREA_FILTER[0].value,
      max: AREA_FILTER.at(-1)!.value,
    });
    setKind([]);
    setCrop({});
    setPlace({ id: null, name: null });

    updateFilterQuery(
      {
        type: null,
        price: {
          min: PRICE_FILTER[0].value,
          max: PRICE_FILTER.at(-1)!.value,
        },
        area: {
          min: AREA_FILTER[0].value,
          max: AREA_FILTER.at(-1)!.value,
        },
        kind: [],
        crop: {},
        place: { id: null, name: null },
      },
      router,
    );
  };

  return (
    <button
      onClick={handleAllReset}
      className="flex gap-[10px] flex-shrink-0 items-center px-4 py-2 rounded-full border border-[#DDDFE5] transition-colors duration-200 outline-none text-[18px] text-[#9C9EA5] cursor-pointer"
    >
      <span>초기화</span>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6667 7.16667C14.6667 7.16667 13.33 5.34548 12.2441 4.25883C11.1582 3.17218 9.6576 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5C10.7354 14.5 13.0433 12.6695 13.7655 10.1667M14.6667 7.16667V3.16667M14.6667 7.16667H10.6667"
          stroke="#9C9EA5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
