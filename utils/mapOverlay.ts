import { KIND_FILTER, TYPE_FILTER } from "@/constants/filterOptions";
import { formatKoreanUnit } from "./format";

export const createOverlayContent = (
  type: "lease" | "sale",
  price: number,
  area: number,
  kind: "field" | "paddy" | "orchard",
): HTMLElement => {
  const div = document.createElement("div");
  div.className = "custom-overlay";

  let bgColor = "#339C43"; // 기본색
  if (kind === "field") bgColor = "#339C43"; // 밭
  else if (kind === "paddy") bgColor = "#C4F568"; // 논
  else if (kind === "orchard") bgColor = "#39B94C"; // 과수원
  div.style.backgroundColor = bgColor;

  if (kind === "paddy") div.style.color = "#000";
  else div.style.color = "#FFF";

  div.innerHTML = `
  <dl class="area-kind"><d>${area}평</d><dd>(${KIND_FILTER[kind]})</dd></dl>
  <dl class="type-price"><dt>${TYPE_FILTER[type]}</dt><dd>${formatKoreanUnit(
    price,
  )}</dd></dl>
  `;
  return div;
};
