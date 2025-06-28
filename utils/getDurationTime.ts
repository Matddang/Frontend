import { Place } from "@/types/myPlace";

export const getDurationTime = async (
  selected: Place,
  coordinate: number[],
) => {
  try {
    return await fetch(
      `/api/distance?origin=${selected.latitude},${selected.longitude}&destination=${coordinate[1]},${coordinate[0]}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.rows) {
          const value = data.rows[0]?.elements[0]?.duration?.text || "";

          if (value) {
            const [hours, mins] = value
              .split(" ")
              .filter((v: string) => Number(v));

            if (hours && mins) return `${hours}시간 ${mins}분`;
            else if (!mins) return `${hours}시간`;
            else return `${mins}분`;
          }
        }
      });
  } catch (e) {
    console.error(e);
    return "";
  }
};
