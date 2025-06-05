import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header />
      <div className="flex flex-1">
        {/* 좌측 사이드바 */}
        <SideBar>
          <div>검색</div>
          <div>농부 타입</div>
          <div>
            <div>맞땅 가이드</div>
            <div>추천 매물 랭킹</div>
            <div>유용한 정보</div>
          </div>
        </SideBar>
        {/* 우측: 네브바 + 맵 */}
        <div className="flex flex-col flex-1">
          <div className="h-[50px] border-b border-[#F3F3F3]">네브바</div>
          <Map />
        </div>
      </div>
    </main>
  );
}
