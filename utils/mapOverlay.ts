import { KIND_FILTER, TYPE_FILTER } from "@/constants/filterOptions";
import { formatKoreanUnit } from "./format";

export const createOverlayContent = (
  type: "lease" | "sale",
  price: number,
  area: number,
  kind: "field" | "paddy" | "orchard",
): HTMLElement => {
  const div = document.createElement("div");
  div.className = `custom-overlay kind-${kind}`;

  div.innerHTML = `
    <dl class="area-kind">
      <dt>${area}평</dt>
      <dd>(${KIND_FILTER[kind]})</dd>
    </dl>
    <dl class="type-price">
      <dt>${TYPE_FILTER[type]}</dt>
      <dd>${formatKoreanUnit(price)}</dd>
    </dl>
  `;
  return div;
};
