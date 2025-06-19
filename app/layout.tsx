import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import localFont from "next/font/local";
import Script from "next/script";
import KakaoScript from "@/components/login/KakaoScript";

declare global {
  interface Window {
    Kakao: any;
  }
}

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "500",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "맞땅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=clusterer&autoload=false`}
        />
      </head>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>{children}</Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
