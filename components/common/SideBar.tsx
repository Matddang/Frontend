import { ReactNode } from "react";

export default function SideBar({ children }: { children: ReactNode }) {
  return (
    <aside className="flex flex-col w-[390px] h-full shrink-0 border-r border-[#F3F3F3]">
      {children}
    </aside>
  );
}
