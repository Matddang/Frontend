// export async function getListingDetail(id: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sale/${id}`, {
//     method: "GET",
//     next: { revalidate: 60 * 5 }, // 5분마다 ISR 재생성
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch listing detail");
//   }

//   const json = await res.json();
//   return json.data;
// }

import axios from "axios";

export async function getListingDetail(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
