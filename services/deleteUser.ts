import { useUserStore } from "@/store/UserStore";
import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";
import { redirect } from "next/navigation";

export async function deleteUser() {
  const { clearUser } = useUserStore.getState();
  const { token, clearToken } = useTokenStore.getState();

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (response.status === 200) {
      clearUser();
      clearToken();
      redirect("/");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
