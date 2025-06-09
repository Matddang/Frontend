import Button from "@/components/common/Button";
import { useFilterStore } from "@/store/FilterStore";
import { useState } from "react";

export default function TypeFilter() {
  const type = useFilterStore((state) => state.type);
  const [tempType, setTempType] = useState<typeof type>(type);

  return (
    <div className="flex gap-[21px]">
      <Button
        text="임대"
        onClick={() => setTempType("lease")}
        isActive={tempType === "lease"}
      />
      <Button
        text="매매"
        onClick={() => setTempType("sale")}
        isActive={tempType === "sale"}
      />
    </div>
  );
}
