// components/ListingRankCard.tsx
import Image, { StaticImageData } from "next/image";

interface ListingRankCardProps {
  image: StaticImageData;
  alt: string;
  label: string;
  onClick: () => void;
}

export default function ListingRankCard({
  image,
  alt,
  label,
  onClick,
}: ListingRankCardProps) {
  return (
    <button
      className="w-full rounded-[8px] bg-white flex gap-[15px] items-center pl-[9px] py-3 border border-gray-300"
      onClick={onClick}
    >
      <div className="max-w-[64px] w-full relative aspect-square">
        <Image
          src={image}
          alt={alt}
          fill
          className="rounded-full object-contain"
        />
      </div>
      <span className="text-left whitespace-pre-line">{label}</span>
    </button>
  );
}
