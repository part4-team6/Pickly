import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ProductIdStatsBoneProps {
  title: string;
  icon: StaticImageData;
  score: number;
  diffValue?: number;
  unit: string;
}

export default function ProductIdStatsBone({
  title,
  icon,
  score,
  diffValue,
  unit,
}: ProductIdStatsBoneProps) {
  return (
    <div className="w-[300px] h-[190px] flex justify-center items-center mx-auto border-[1px] rounded-[12px] border-[#353542] bg-[#252530]">
      <div className="w-[152px] h-[130px] flex justify-between items-center flex-col">
        <div className="text-[18px] font-medium">{title}</div>
        <div className="flex gap-[5px] items-center justify-between">
          <Image
            src={icon}
            alt="별 / 하트 / 말풍선 아이콘"
            className="w-[24px] h-[24px]"
          />
          <div className="text-[24px] font-[300] text-[#9FA6B2]">{score}</div>
        </div>
        <div className="text-[13px] font-[300] text-[#9FA6B2] text-center">
          {typeof diffValue === "number" &&
            (() => {
              const roundedDiff = Math.round(diffValue);
              return (
                <>
                  같은 카테고리의 제품들보다
                  <span className="text-[#f1f1f5] font-medium">
                    {Math.abs(roundedDiff)}
                    {unit}
                  </span>{" "}
                  {roundedDiff > 0
                    ? "더 적어요!"
                    : roundedDiff < 0
                    ? "더 많아요!"
                    : "같은 수준이에요!"}
                </>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
