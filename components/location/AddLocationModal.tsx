"use client";

import Image from "next/image";
import Modal from "../common/Modal";
import HomeIcon from "@/assets/images/home-white.svg";
import { useEffect, useState } from "react";
import SearchIcon from "@/assets/images/search.svg";
import { useDebounce } from "@/hooks/useDebounce";

interface AddLocationModalProps {
  title: string;
  onClose: () => void;
  data?: {
    type: string;
    name: string;
    address: string;
  };
}

export default function AddLocationModal({
  title,
  onClose,
  data,
}: AddLocationModalProps) {
  const [type, setType] = useState(data?.type || "");
  const [count, setCount] = useState(0);
  const [name, setName] = useState(data?.name || "");
  const [location, setLoction] = useState(data?.address || "");
  const debouncedValue = useDebounce(location, 1000);
  const [address, setAddress] = useState([
    "전라남도 영광군 법성명 진굴비길 22-28",
  ]);
  const [selectedLocation, setSelectedLoctaion] = useState(-1);

  useEffect(() => {
    if (name === "") setCount(0);
    else setCount(name.length);
  }, [name]);

  useEffect(() => {
    if (selectedLocation >= 0) setLoction(address[selectedLocation]);
  }, [selectedLocation, address]);

  return (
    <Modal width={498} onClose={onClose}>
      <div className="flex flex-col h-full max-h-[calc(100vh-141px)]">
        <div className="flex flex-col gap-[4px] mb-[34px]">
          <span className="font-bold text-[24px] text-black">{title}</span>
          <span className="text-[16px] text-gray-900">
            위치로 검색하고, 농지나 거주지에 이름도 붙여봐요.
          </span>
        </div>

        <div className="flex justify-between gap-[14px] mb-[34px]">
          {["HOME", "ORCHARD"].map((value) => (
            <button
              key={value}
              className={`w-full py-[10px] rounded-[6px] border-[1px] flex gap-[10px] justify-center items-center cursor-pointer ${
                type === value ? "border-primary" : "border-gray-500"
              }`}
              onClick={() => setType(value)}
            >
              <div
                className={`flex justify-center items-center rounded-[50%] w-[34px] h-[34px] ${
                  type === value ? "bg-primary" : "bg-gray-600"
                }`}
              >
                <Image src={HomeIcon} alt="home" />
              </div>
              <span className="text-[16px] font-bold text-black">
                {value === "HOME" ? "거주지" : "농지"}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col flex-1 min-h-0 gap-[40px]">
          <div className="flex flex-col flex-1 min-h-0 gap-[24px]">
            <div className="flex flex-col gap-[10px]">
              <span className="font-semibold text-[18px] text-black">
                장소명
              </span>
              <div className="relative">
                <input
                  className={`w-full rounded-[8px] border-[1px] py-[12px] pl-[14px] pr-[63px] bg-gray-100 focus:outline-none text-[16px] text-black placeholder:text-gray-600 ${
                    count >= 50
                      ? "border-system-red focus:border-system-red"
                      : "border-gray-400 focus:border-primary"
                  }`}
                  placeholder="장소명 입력 ex) 여수 포도밭, 광양 삼촌네 밭"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength={50}
                />
                <span className="text-[16px] text-gray-600 absolute right-[14px] top-[50%] transform -translate-y-1/2">
                  <span
                    className={`${
                      count >= 50
                        ? "text-system-red"
                        : count
                        ? "text-black"
                        : "text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                  /50
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <span className="font-semibold text-[18px] text-black">위치</span>
              <div className="relative">
                <input
                  className="w-full rounded-[8px] border-[1px] border-gray-400 py-[12px] pl-[14px] pr-[52px] bg-gray-100 focus:outline-none focus:border-primary text-[16px] text-black placeholder:text-gray-600"
                  placeholder="지번으로 검색 ex) 광양시 OO구 OO동 1-1"
                  onChange={(e) => setLoction(e.target.value)}
                  value={location}
                />
                <Image
                  src={SearchIcon}
                  alt="search"
                  className="absolute right-[14px] top-[50%] transform -translate-y-1/2"
                />
              </div>
            </div>

            {address.length > 0 && (
              <div
                className="overflow-y-auto bg-gray-100 rounded-[8px]"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="min-h-[343px]">
                  {address.map((addr, i) => (
                    <div
                      key={i}
                      className={`h-[81px] text-[16px] font-bold text-black px-[12px] flex items-center border-b-[1px] border-b-gray-400 cursor-pointer ${
                        selectedLocation === i
                          ? "bg-primary-light"
                          : "bg-gray-100"
                      }`}
                      onClick={() => setSelectedLoctaion(i)}
                    >
                      {addr}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="font-semibold text-[16px] text-white py-[12px] rounded-[8px] cursor-pointer bg-primary disabled:bg-gray-500 disabled:cursor-auto"
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08" }}
            disabled={selectedLocation === -1 || !name}
          >
            등록
          </button>
        </div>
      </div>
    </Modal>
  );
}
