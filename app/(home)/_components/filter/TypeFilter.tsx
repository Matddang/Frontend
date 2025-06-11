import Button from "@/components/common/Button";

interface TypeFilterProps {
  tempType: "lease" | "sale" | null;
  setTempType: (value: "lease" | "sale" | null) => void;
}
export default function TypeFilter({ tempType, setTempType }: TypeFilterProps) {
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
