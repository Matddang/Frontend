import SideBar from "../_components/SideBar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
