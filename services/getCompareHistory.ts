import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function getCompareHistory() {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale/compare/list`,
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
