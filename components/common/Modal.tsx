"use client";

import { useEffect } from "react";
import XIcon from "@/assets/images/modal-x-icon.svg";
import Image from "next/image";

interface ModalProps {
  width: number;
  height?: number;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ width, children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div
      className="z-999 fixed top-0 inset-0"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.50)",
      }}
    >
      <div className="flex items-center justify-center min-h-[100vh] px-[20px] py-[40px] w-full">
        <div
          className="bg-white rounded-[20px] pt-[31px] pb-[30px] px-[20px] relative"
          style={{
            width: `${width}px`,
            maxHeight: "calc(100vh - 80px)",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Image
            src={XIcon}
            alt="close"
            className="absolute top-[20px] right-[20px] cursor-pointer"
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
