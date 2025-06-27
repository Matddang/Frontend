export const getCoordsFromAddress = async (address: string) => {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
    address,
  )}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Kakao API 요청 실패: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    if (data.documents && data.documents.length > 0) {
      const { x, y } = data.documents[0];
      return { lat: parseFloat(y), lng: parseFloat(x) };
    } else {
      console.warn(`주소를 찾을 수 없습니다: ${address}`);
      return null;
    }
  } catch (error) {
    console.error("getCoordsFromAddress 에러:", error);
    return null;
  }
};
