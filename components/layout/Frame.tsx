import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function Frame({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <div className="min-w-[1007px] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-100" style={{ background: bgColor }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
