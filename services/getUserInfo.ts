import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function getUserInfo(accessToken?: string) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/me`,
      {
        headers: {
          Authorization: accessToken || token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
