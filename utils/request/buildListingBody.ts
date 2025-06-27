/* eslint-disable @typescript-eslint/no-explicit-any */

import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";
import { MapBounds } from "@/store/MapStore";

interface Filters {
  keyword?: string;
  bounds?: MapBounds | null;
  type?: string | null;
  price?: { min: number; max: number };
  area?: { min: number; max: number };
  kind?: string[];
  crop?: { [parent: string]: string[] };
  place?: { id: number | null; name: string | null };
}

export const buildListingBody = ({
  keyword,
  bounds,
  type,
  kind,
  area,
  price,
  crop,
}: Filters) => {
  const body: Record<string, any> = {};

  if (type) body.saleCategoryList = [type];
  if (kind) body.landCategoryList = kind;

  if (area?.min) body.minArea = area.min;
  if (area?.max !== AREA_FILTER[AREA_FILTER.length - 1].value)
    body.maxArea = area?.max;

  if (price?.min) body.minPrice = price.min;
  if (price?.max !== PRICE_FILTER[PRICE_FILTER.length - 1].value)
    body.maxPrice = price?.max;

  if (crop && typeof crop === "object") {
    const cropValues = Object.values(crop)
      .flat()
      .map((v) => Number(v));
    if (cropValues.length > 0) {
      body.cropIds = cropValues;
    }
  }

  if (keyword) {
    body.keyword = keyword;
  } else if (bounds) {
    body.zoom = [bounds.swLat, bounds.swLng, bounds.neLat, bounds.neLng];
  }

  return body;
};
