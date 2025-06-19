import emailLogo from "@/assets/images/mail.svg";
import instagramLogo from "@/assets/images/instagram.svg";
import youtubeLogo from "@/assets/images/youtube.svg";
import kakaoTalkLogo from "@/assets/images/kakaotalk.svg";
import Logo from "@/assets/images/logo-icon.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-gray-300 border-t-[1px] border-gray-400 px-[50px] pt-[50px] pb-[100px] flex justify-center">
      <div className="flex justify-between w-full max-w-[1440px]">
        <div className="flex flex-col w-[670px] gap-[14px]">
          <Image src={Logo} alt="logo" />
          <span className="text-[16px] text-gray-900">
            Copyright ⓒ Maddang ALL RIGHTS RESERVED.
          </span>
        </div>
        <div className="w-[670px]">
          <div className="flex gap-[33.6px] justify-end">
            {[emailLogo, instagramLogo, youtubeLogo, kakaoTalkLogo].map(
              (logo, i) => (
                <Image
                  key={i}
                  src={logo}
                  alt={logo}
                  className="cursor-pointer"
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
