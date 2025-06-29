import { useTokenStore } from "@/store/useTokenStore";
import axios from "axios";

export interface GetListingRequest {
  saleCategoryList?: string[];
  landCategoryList?: string[];
  cropIds?: number[];
  location?: number[];
  zoom?: number[];
  sortBy?: string;
  keyword?: string;
  page?: number;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}

export async function getListing(requestData: GetListingRequest) {
  const { token } = useTokenStore.getState();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sale`,
      requestData,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
}
