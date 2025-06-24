import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function likeProperty(saleId: number) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale/liked/${saleId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.status;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
