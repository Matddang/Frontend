import Header from "@/components/common/Header";
import NavBar from "./_components/NavBar";

export default function HomeLayout({
  sidebar,
  map,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  map: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header />
      <div className="flex flex-1 overflow-y-scroll relative">
        {/* 좌측 사이드바 */}
        {sidebar}
        {/* 우측: 네브바 + 맵 */}
        <div className="flex flex-col flex-1 ">
          <NavBar />
          {map}
        </div>
      </div>
    </main>
  );
}
