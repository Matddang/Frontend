import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-100">{children}</div>
      <Footer />
    </div>
  );
}
