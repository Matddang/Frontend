import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export async function checkTypetest() {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/type?complete=true`,
      {},
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
