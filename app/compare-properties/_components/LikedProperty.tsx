import PropertyItem from "./PropertyItem";

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

  return (
    <div className="flex flex-col gap-[16px]">
      {property_list.map((property, i) => (
        <PropertyItem key={i} property={property} />
      ))}
    </div>
  );
}
