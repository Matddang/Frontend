import Frame from "@/components/layout/Frame";
import GuideImg1 from "@/assets/images/guide-1.png";
import GuideImg2 from "@/assets/images/guide-2.png";
import GuideImg3 from "@/assets/images/guide-3.png";
import GuideImg4 from "@/assets/images/guide-4.png";
import GuideImg5 from "@/assets/images/guide-5.png";
import GuideImg6 from "@/assets/images/guide-6.png";
import GuideImg7 from "@/assets/images/guide-7.png";
import GuideImg8 from "@/assets/images/guide-8.png";
import Image from "next/image";

export default function Page() {
  return (
    <Frame bgColor="linear-gradient(180deg, #F9FAF5 0%, #FFF 100%)">
      <div className="text-nowrap">
        {/* <div className="h-[540px] bg-[linear-gradient(to_right,_#17a52c_50%,_#3ab52b_50%)]" /> */}
        <div
          className="h-[807px] mt-[-67px] mb-[163px] bg-no-repeat bg-center flex items-end justify-center"
          style={{ backgroundImage: 'url("/guide-bg.svg")' }}
        >
          <div className="flex items-center pb-[99px]">
            <div className="flex flex-col gap-[31px]">
              <span className="font-bold text-[41px] text-white font-line-seed leading-tight">
                나에게 딱 맞는 농지 매물,
                <br />
                맞땅이 찾아드려요!
              </span>
              <span className="text-[19.88px] text-white">
                맞땅은 농지 초보자도 쉽게 사용할 수 있는
                <br />
                농지 검색 및 추천 서비스입니다.
              </span>
            </div>
            <Image src={GuideImg1} alt="guide-img" width={559} />
          </div>
        </div>

        <div className="flex flex-col gap-[131px] items-center mb-[221px]">
          <div className="flex flex-col gap-[25px] items-center">
            <span className="font-bold text-[44px] text-guide-olive font-line-seed">
              맞땅(MATDDANG)이란?
            </span>
            <span className="text-[27.62px] text-[#484848] text-center leading-tight tracking-0">
              맞땅은 영농 계획, 자금 상황, 주거지 정보를 기반으로
              <br />
              맞춤형 필터와 지도 중심 탐색 기능을 제공해,
              <br />
              사용자가 자신에게 꼭 맞는 농지를 쉽고 효율적으로 찾을 수 있도록
              돕습니다
            </span>
          </div>
          <Image src={GuideImg2} alt="guide-img" width={782} />
        </div>
      </div>

      <div className="flex flex-col gap-[100px]">
        <div className="flex gap-[122.78px] h-[638px] bg-primary-light items-center justify-center">
          <div className="flex flex-col gap-[55px]">
            <span className="font-bold text-[36px] text-[#2A2A2A] font-line-seed leading-tight text-nowrap">
              내 농업 스타일을 진단하고,
              <br />딱 맞는 농지를 추천받으세요.
            </span>
            <div className="flex flex-col gap-[15.67px]">
              <span className="text-[18.02px] leading-tight font-bold text-primary">
                #농업 스타일 유형 기반 맞춤 추천
              </span>
              <span className="text-[18.02px] leading-tight text-[#484848]">
                서비스 이용 과정 전반에서 사용자 유형에 따라 현실적이고
                <br />
                맞춤화된 정보를 제공합니다.
              </span>
            </div>
          </div>
          <Image src={GuideImg3} alt="guide-img" width={418.22} />
        </div>

        <div className="flex items-center justify-center h-[638px] bg-primary gap-[132.68px]">
          <Image src={GuideImg4} alt="guide-img" width={420.32} />
          <div className="flex flex-col gap-[55px]">
            <span className="font-bold text-[36px] text-white font-line-seed leading-tight text-nowrap">
              내 농업 스타일을 진단하고,
              <br />딱 맞는 농지를 추천받으세요.
            </span>
            <div className="flex flex-col gap-[15.67px]">
              <span className="text-[18.02px] leading-tight font-bold text-white">
                #농업 스타일 유형 기반 맞춤 추천
              </span>
              <span className="text-[18.02px] leading-tight text-white">
                서비스 이용 과정 전반에서 사용자 유형에 따라 현실적이고
                <br />
                맞춤화된 정보를 제공합니다.
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-[82.4px] h-[638px] items-center justify-center">
          <div className="flex flex-col gap-[55px]">
            <span className="font-bold text-[36px] text-[#2A2A2A] font-line-seed leading-tight text-nowrap">
              필터를 통해 세부적인
              <br />
              조건을 설정해 보세요.
            </span>
            <div className="flex flex-col gap-[15.67px]">
              <span className="text-[18.02px] leading-tight font-bold text-primary">
                #필터 검색 기능
              </span>
              <span className="text-[19.39px] leading-tight text-[#484848] w-[403px]">
                총 6개의 필터를 통해 내 상황과 가장 핏한 매물만 검색해 보세요.
                내가 원하는 작물을 키우기 가장 적합한 농지를 검색할 수 있고,
                우리집에서 가장 가까운 농지도 찾을 수 있어요.
              </span>
            </div>
          </div>
          <Image src={GuideImg5} alt="guide-img" width={470.6} />
        </div>

        <div className="flex gap-[48px] h-[638px] items-center justify-center bg-primary-light">
          <div className="flex flex-col gap-[55px]">
            <span className="font-bold text-[36px] text-[#2A2A2A] font-line-seed leading-tight text-nowrap">
              매물 기본 정보부터 수익
              <br />
              시뮬레이터까지
              <br />
              자세히 확인해 보세요.
            </span>
            <div className="flex flex-col gap-[15.67px]">
              <span className="text-[18.02px] leading-tight font-bold text-primary">
                #농업 스타일 유형 기반 맞춤 추천
              </span>
              <span className="text-[18.81px] leading-tight text-[#484848] w-[403px]">
                가격, 용도지역, 면적 등 행정적인 정보뿐만 아니라 내 장소 기반
                거리, 가까운 농사인프라, 수익 시뮬레이터, 해당 매물과 비슷한
                매물들까지, 더 실질적인 정보들로 구성되어 있어요.
              </span>
            </div>
          </div>
          <Image src={GuideImg6} alt="guide-img" width={505} />
        </div>

        <div className="flex gap-[109px] h-[638px] items-center justify-center bg-primary-dark mb-[199px]">
          <div className="flex flex-col gap-[55px]">
            <span className="font-bold text-[36px] text-white font-line-seed leading-tight text-nowrap">
              찜한 농지들은
              <br />
              비교 기능을 통해 비교하세요.
            </span>
            <div className="flex flex-col gap-[15.67px]">
              <span className="text-[18.02px] leading-tight font-bold text-white">
                #매물 비교 기능
              </span>
              <span className="text-[18.81px] leading-tight text-white w-[403px]">
                매물비교 기능을 통해서 내가 찜한 농지매물 2개를 비교
                분석해보세요. 일일이 메모하지 않아도 바로 세부 조건을 비교할 수
                있어요.
              </span>
            </div>
          </div>
          <div className="relative">
            <Image src={GuideImg8} alt="guide-img" width={432} />
            <Image
              src={GuideImg7}
              alt="guide-img"
              width={283.97}
              className="absolute bottom-[-70px] right-[-164px]"
            />
          </div>
        </div>
      </div>
    </Frame>
  );
}
