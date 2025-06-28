import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export default async function updateMyPlace(
  placeId: number,
  place: {
    placeType: string;
    placeName: string;
    address: string;
    latitude: number;
    longitude: number;
  },
) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/place/${placeId}`,
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
