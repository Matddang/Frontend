import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export default async function createMyPlace(place: {
  placeType: string;
  placeName: string;
  address: string;
}) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/place`,
      place,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response.status;
  } catch (err) {
    throw err;
  }
}
