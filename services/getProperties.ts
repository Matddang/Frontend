import axios from "axios";

export async function getProperties(sortBy: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale`,
      {
        sortBy,
        size: 5,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
