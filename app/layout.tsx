import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import localFont from "next/font/local";
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
    <html lang="en">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Providers>{children}</Providers>
      </body>
      <KakaoScript />
    </html>
  );
}
