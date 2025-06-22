import axios from "axios";

export async function kakaoLogin(code: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/login/kakao?code=${code}`,
    );
    return {
      token: response.headers["authorization"],
      data: response.data,
    };
  } catch (error) {
    console.error("토큰 요청 실패:", error);
    throw new Error();
  }
}

export async function googleLogin(accessToken: string, idToken: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/login/google`,
      {
        accessToken,
        idToken,
      },
    );
    return {
      token: response.headers["authorization"],
      data: response.data,
    };
  } catch (error) {
    console.error("토큰 요청 실패:", error);
    throw new Error();
  }
}
