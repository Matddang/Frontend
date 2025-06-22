import axios from "axios";

export async function getListing() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale`,
      {
        saleCategoryList: [],
        landCategoryList: [],
        cropIds: [],
        location: [],
        page: 1,
        sortBy: "liked",
        keyword: "",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
