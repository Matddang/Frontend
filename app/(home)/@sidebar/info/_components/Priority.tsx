export default function Priority({
  children,
  title,
  semiTitle,
}: {
  children: React.ReactNode;
  title: string;
  semiTitle: string;
}) {
  const splitedTitle = title.split("\n");

  return (
    <div
      className="flex flex-col items-center gap-[28px] pb-[32px]"
      style={{
        background: "linear-gradient(180deg, #F0FFD7 0%, #D7EFAE 100%)",
      }}
    >
      <div className="w-full flex flex-col gap-[6px] px-[16px] pt-[16px]">
        <span className="font-semibold text-[20px] text-black">
          {splitedTitle[0]}
          <br />
          {splitedTitle[1]}
        </span>
        <span className="typo-body-2-m text-gray-900">{semiTitle}</span>
      </div>

      {children}
    </div>
  );
}
