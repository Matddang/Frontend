"use client";

import Image from "next/image";
import Modal from "../common/Modal";
import HomeIcon from "@/assets/images/home-white.svg";
import { useEffect, useState } from "react";
import SearchIcon from "@/assets/images/search.svg";
import { useDebounce } from "@/hooks/useDebounce";
import { getAddress } from "@/services/getAddress";
import { useMutation, useQuery } from "@tanstack/react-query";
import createMyPlace from "@/services/createMyPlace";
import { queryClient } from "@/app/Providers";
import updateMyPlace from "@/services/updateMyPlace";

interface AddLocationModalProps {
  title: string;
  onClose: () => void;
  data?: {
    placeId: number;
    address: string;
    placeType: string;
    placeName: string;
  };
}

export default function AddLocationModal({
  title,
  onClose,
  data,
}: AddLocationModalProps) {
  const [type, setType] = useState(data?.placeType || "");
  const [count, setCount] = useState(0);
  const [name, setName] = useState(data?.placeName || "");
  const [location, setLoction] = useState(data?.address || "");
  const debouncedValue = useDebounce(location, 1000);
  const [addressResult, setAddressResult] = useState([]);
  const [selectedLocation, setSelectedLoctaion] = useState("");
  const [shouldSearch, setShouldSearch] = useState(true);

  const isEdit = title === "내 장소 수정하기";

  const { data: region } = useQuery({
    queryKey: ["address", debouncedValue],
    queryFn: () => debouncedValue && getAddress(debouncedValue),
    staleTime: 1000 * 60 * 5,
    enabled: !!debouncedValue && shouldSearch,
  });

  const mutation = useMutation({
    mutationFn: () =>
      createMyPlace({
        placeType: type,
        placeName: name,
        address: selectedLocation,
      }),
    onSuccess: (status) => {
      if (status === 200) {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["myPlace"] });
      }
    },
    onError: () => {
      console.error("내 장소 등록 실패");
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateMyPlace(data!.placeId, {
        placeType: type,
        placeName: name,
        address: selectedLocation || data!.address,
      }),
    onSuccess: (status) => {
      if (status === 200) {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["myPlace"] });
      }
    },
    onError: () => {
      console.error("내 장소 등록 실패");
    },
  });

  useEffect(() => {
    if (name === "") setCount(0);
    else setCount(name.length);
  }, [name]);

  useEffect(() => {
    if (region) {
      const results = region.map((v: { roadAddr: string }) => v.roadAddr);
      setAddressResult(results);
      setSelectedLoctaion("");
    }
  }, [region]);

  const handleRegister = () => {
    if (isEdit) updateMutation.mutate();
    else mutation.mutate();
  };

  return (
    <Modal width={498} onClose={onClose}>
      <div className="relative z-30 flex flex-col h-full max-h-[calc(100vh-141px)]">
        <div className="flex flex-col gap-[4px] mb-[34px]">
          <span className="typo-head-3 text-black">{title}</span>
          <span className="typo-body-1-m text-gray-900">
            위치로 검색하고, 농지나 거주지에 이름도 붙여봐요.
          </span>
        </div>

        <div className="flex justify-between gap-[14px] mb-[34px]">
          {["HOME", "FARM"].map((value) => (
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
              <span className="typo-body-1-b text-black">
                {value === "HOME" ? "거주지" : "농지"}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col flex-1 min-h-0 gap-[40px]">
          <div className="flex flex-col flex-1 min-h-0 gap-[24px]">
            <div className="flex flex-col gap-[10px]">
              <span className="typo-sub-head-sb text-black">장소명</span>
              <div className="relative">
                <input
                  className={`w-full rounded-[8px] border-[1px] py-[12px] pl-[14px] pr-[63px] bg-gray-100 focus:outline-none typo-body-1-m text-black placeholder:text-gray-600 ${
                    count >= 50
                      ? "border-system-red focus:border-system-red"
                      : "border-gray-400 focus:border-primary"
                  }`}
                  placeholder="장소명 입력 ex) 여수 포도밭, 광양 삼촌네 밭"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength={50}
                />
                <span className="typo-body-1-m text-gray-600 absolute right-[14px] top-[50%] transform -translate-y-1/2">
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
              <span className="typo-sub-head-sb text-black">위치</span>
              <div className="relative">
                <input
                  className="w-full rounded-[8px] border-[1px] border-gray-400 py-[12px] pl-[14px] pr-[52px] bg-gray-100 focus:outline-none focus:border-primary typo-body-1-m text-black placeholder:text-gray-600"
                  placeholder="지번으로 검색 ex) 광양시 OO구 OO동 1-1"
                  onChange={(e) => {
                    setLoction(e.target.value);
                    setShouldSearch(true);
                  }}
                  value={location}
                />
                <Image
                  src={SearchIcon}
                  alt="search"
                  className="absolute right-[14px] top-[50%] transform -translate-y-1/2"
                />
              </div>
            </div>

            {addressResult.length > 0 && (
              <div
                className="overflow-y-auto bg-gray-100 rounded-[8px]"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="min-h-[343px]">
                  {addressResult.map((addr, i) => (
                    <div
                      key={i}
                      className={`h-[81px] typo-body-1-b text-black px-[12px] flex items-center border-b-[1px] border-b-gray-400 cursor-pointer ${
                        selectedLocation === addr
                          ? "bg-primary-light"
                          : "bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedLoctaion(addr);
                        setShouldSearch(false);
                        setLoction(addr);
                      }}
                    >
                      {addr}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className="typo-sub-head-sb text-white py-[12px] rounded-[8px] cursor-pointer bg-primary disabled:bg-gray-500 disabled:cursor-auto"
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08" }}
            disabled={!isEdit && (selectedLocation === "" || !name)}
            onClick={handleRegister}
          >
            등록
          </button>
        </div>
      </div>
    </Modal>
  );
}
