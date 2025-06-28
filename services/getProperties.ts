import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function getProperties(sortBy: string) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale`,
      {
        sortBy,
        size: 5,
      },
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
