import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function getMyPlace() {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/place`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
