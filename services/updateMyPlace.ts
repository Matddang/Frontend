import axios from "axios";

export default async function updateMyPlace(
  placeId: number,
  place: {
    placeType: string;
    placeName: string;
    address: string;
  },
  accessToken: string,
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/place/${placeId}`,
      place,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );

    return response.status;
  } catch (err) {
    throw err;
  }
}
