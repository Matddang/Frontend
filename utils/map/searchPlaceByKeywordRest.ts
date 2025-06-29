/* eslint-disable @typescript-eslint/no-explicit-any */

export const searchPlaceByKeywordRest = async (
  keyword: string,
  rect?: string, // "126,33.5,128,35.8" 형식
  maxPages = 5, // 최대 페이지 수 (API 제한에 맞게 조절)
) => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (!apiKey) throw new Error("Kakao REST API Key is 없습니다");

  let allDocuments: any[] = [];
  let page = 1;

  try {
    while (page <= maxPages) {
      let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        keyword,
      )}&page=${page}`;

      if (rect) {
        url += `&rect=${rect}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Kakao API 요청 실패: ${res.status}`);
      }

      const data = await res.json();
      if (data.documents && data.documents.length > 0) {
        allDocuments = allDocuments.concat(data.documents);

        // 더 이상 페이지가 없으면 종료
        if (data.meta.is_end) {
          break;
        }
      } else {
        break;
      }

      page++;
    }

    return allDocuments;
  } catch (error) {
    console.error("searchPlaceByKeywordRest 에러:", error);
    return null;
  }
};
