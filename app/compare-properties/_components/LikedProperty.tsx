import { useQuery } from "@tanstack/react-query";
import PropertyItem from "./PropertyItem";
import { getLikedProperty } from "@/services/getLikedProperty";
import { useTokenStore } from "@/store/useTokenStore";

export default function LikedProperty() {
  const property_list = [
    {
      id: 1,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
    {
      id: 2,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
    {
      id: 3,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
  ];

  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["likedProperty"],
    queryFn: () => getLikedProperty(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  return (
    <div className="flex flex-col gap-[16px]">
      {property_list.map((property, i) => (
        <PropertyItem key={i} property={property} />
      ))}
    </div>
  );
}
