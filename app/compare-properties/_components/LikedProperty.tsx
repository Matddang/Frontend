import { useQuery } from "@tanstack/react-query";
import PropertyItem from "./PropertyItem";
import { getLikedProperty } from "@/services/getLikedProperty";
import { useTokenStore } from "@/store/useTokenStore";
import { Property } from "@/types/property";

export default function LikedProperty() {
  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["likedProperty"],
    queryFn: () => getLikedProperty(),
    enabled: !!token,
  });

  const sales: Property[] = data?.data || [];

  return (
    <div className="flex flex-col gap-[16px]">
      {sales.map((sale: Property) => (
        <PropertyItem key={sale.saleId} property={sale} />
      ))}
    </div>
  );
}
