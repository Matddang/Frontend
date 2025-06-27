import { Suspense } from "react";
import SideBar from "./_components/SideBar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <SideBar>{children}</SideBar>
    </Suspense>
  );
}
