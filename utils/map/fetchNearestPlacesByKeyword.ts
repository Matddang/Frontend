/* eslint-disable @typescript-eslint/no-explicit-any */

interface PlaceResult {
  place_name: string;
  lat: number;
  lng: number;
  address: string;
  distance: number;
}

export const fetchNearestPlacesByKeyword = async (
  keyword: string,
  lat: number,
  lng: number,
): Promise<PlaceResult[]> => {
  const rect = "126,34,128,35.4"; // 전라남도 반경
  const size = 15;
  const maxPages = 5;

  try {
    const requests = Array.from({ length: maxPages }, (_, i) => {
      const page = i + 1;
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword,
      )}&rect=${rect}&page=${page}&size=${size}`;

      return fetch(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }).then((res) => {
        if (!res.ok) throw new Error(`Kakao API 요청 실패: ${res.status}`);
        return res.json();
      });
    });

    const results = await Promise.all(requests);
    const allDocuments = results.flatMap((data) => data.documents || []);

    const processed: PlaceResult[] = allDocuments.map((doc: any) => ({
      place_name: doc.place_name,
      lat: parseFloat(doc.y),
      lng: parseFloat(doc.x),
      address: doc.road_address_name || doc.address_name,
      distance: getDistanceFromLatLonInKm(
        lat,
        lng,
        parseFloat(doc.y),
        parseFloat(doc.x),
      ),
    }));

    return processed.sort((a, b) => a.distance - b.distance).slice(0, 3);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
