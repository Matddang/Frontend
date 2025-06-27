import { useQuery } from "@tanstack/react-query";
import PropertyItem from "./PropertyItem";
import { getLikedProperty } from "@/services/getLikedProperty";
import { useTokenStore } from "@/store/useTokenStore";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";

export default function LikedProperty() {
  const { token } = useTokenStore();
  const [sales, setSales] = useState<Property[]>([]);

  const { data } = useQuery({
    queryKey: ["likedProperty"],
    queryFn: () => getLikedProperty(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.data) {
      setSales(data.data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-[16px]">
      {sales.map((sale: Property) => (
        <PropertyItem key={sale.saleId} property={sale} />
      ))}
    </div>
  );
}
