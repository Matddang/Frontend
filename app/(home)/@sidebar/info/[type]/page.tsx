"use client";

import { usePathname } from "next/navigation";
import Margin from "../_components/Margin";
import Policy from "../_components/Policy";
import Preparing1 from "@/assets/images/preparing1.svg";
import Preparing2 from "@/assets/images/preparing2.svg";
import Image from "next/image";

export default function Page() {
  const pathname = usePathname();

  if (pathname === "/info/margin") return <Margin />;

  if (pathname === "/info/policy") return <Policy />;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-end gap-[9px]">
        <Image src={Preparing1} alt="preparing" />
        <Image src={Preparing2} alt="preparing" />
      </div>
    </div>
  );
}
