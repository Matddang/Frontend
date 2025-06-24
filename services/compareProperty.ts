import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function compareProperty(saleId1: number, saleId2: number) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale/compare/${saleId1}/${saleId2}`,
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
