import axios from "axios";

export default async function createMyPlace(
  place: {
    placeType: string;
    placeName: string;
    address: string;
  },
  accessToken: string,
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/place`,
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
