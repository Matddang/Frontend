import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Filters = {
  type: string | null;
  price: { min: number | null; max: number | null };
  area: { min: number | null; max: number | null };
  kind: string[];
  crop: { [parent: string]: string[] };
  place?: { id: number | null; name: string | null };
};

export const buildFilterQuery = (filters: Filters): Record<string, string> => {
  const query: Record<string, string> = {};

  const addIfChanged = (
    key: string,
    value: number | null,
    defaultValue: number,
  ) => {
    if (value !== null && value !== defaultValue) {
      query[key] = String(value);
    }
  };

  if (filters.type) query.type = filters.type;

  addIfChanged("priceMin", filters.price.min, PRICE_FILTER[0].value);
  addIfChanged("priceMax", filters.price.max, PRICE_FILTER.at(-1)!.value);

  addIfChanged("areaMin", filters.area.min, AREA_FILTER[0].value);
  addIfChanged("areaMax", filters.area.max, AREA_FILTER.at(-1)!.value);

  if (filters.kind.length > 0) {
    query.kind = filters.kind.join(",");
  }

  if (Object.keys(filters.crop).length > 0) {
    query.crop = Object.entries(filters.crop)
      .map(([parent, children]) => `${parent}:${children.join("-")}`)
      .join(",");
  }

  if (filters.place?.id) {
    query.place = String(filters.place.id);
  }

  return query;
};

export const updateFilterQuery = (
  tempFilters: Parameters<typeof buildFilterQuery>[0],
  router: AppRouterInstance,
) => {
  const newFilterQuery = buildFilterQuery(tempFilters);
  const currentParams = new URLSearchParams(window.location.search);

  const filterKeys = [
    "type",
    "priceMin",
    "priceMax",
    "areaMin",
    "areaMax",
    "kind",
    "crop",
    "place",
  ];

  for (const [key, value] of Object.entries(newFilterQuery)) {
    currentParams.set(key, value);
  }

  for (const key of filterKeys) {
    if (!newFilterQuery[key]) {
      currentParams.delete(key);
    }
  }

  router.replace(`${window.location.pathname}?${currentParams.toString()}`, {
    scroll: false,
  });
};
