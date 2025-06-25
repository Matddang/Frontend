import { KIND_FILTER } from "@/constants/filterOptions";
import { formatKoreanUnit } from "./format";

const kindMap: Record<string, string> = {
  전_전: "paddy",
  답_답: "field",
  과수원: "orchard",
};

export const createOverlayContent = (
  type: string,
  price: number,
  area: number,
  kind: string,
): HTMLElement => {
  const div = document.createElement("div");
  div.className = `custom-overlay kind-${kindMap[kind]}`;

  div.innerHTML = `
    <dl class="area-kind">
      <dt>${area}평</dt>
      <dd>(${KIND_FILTER[kind]})</dd>
    </dl>
    <dl class="type-price">
      <dt>${type}</dt>
      <dd>${formatKoreanUnit(price)}</dd>
    </dl>
  `;
  return div;
};

export const createRegionOverlay = (region: string) => {
  const div = document.createElement("div");
  div.className = `region-overlay`;
  div.innerText = region;
  return div;
};
