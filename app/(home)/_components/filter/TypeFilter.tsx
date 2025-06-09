import Button from "@/components/common/Button";
import { useFilterStore } from "@/store/FilterStore";
import { useState } from "react";

export default function TypeFilter({ label }: { label: string }) {
  const type = useFilterStore((state) => state.type);
  const [tempType, setTempType] = useState<typeof type>(type);

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-extrabold">{label}</h2>
      <div className="flex gap-[21px] my-[24px]">
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
    </div>
  );
}
