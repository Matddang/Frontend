import axios from "axios";

export async function getTokens(code: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/login/kakao?code=${code}`,
    );
    return response.data;
  } catch (error) {
    console.error("토큰 요청 실패:", error);
    throw new Error();
  }
}
