import Image from "next/image";

type ActivityProps = {
  text: React.ReactNode | string;
  icon?: string;
  activityData?: number;
};

export default function ActivityCard({
  text,
  activityData,
  icon,
}: ActivityProps) {
  return (
    <div className="w-full  flex bg-[#252530] border border-[#353542] rounded-[8px]  h-[130px] z-[-1]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-[15px]">
        <span className="block text-center text-sm font-medium text-[#9FA6B2] lg:text-base">
          {text}
        </span>
        {icon ? (
          <div className="flex items-center gap-[5px]">
            <div className="relative w-[17px] h-[17px] lg:w-[22px] lg:h-[22px] z-[0]">
              <Image src={icon} alt="아이콘" fill />
            </div>
            <span className="text-xl font-normal text-gray-50 leading-[100%] lg:text-2xl">
              {typeof activityData === "number"
                ? Number.isInteger(activityData)
                  ? activityData
                  : activityData.toFixed(1)
                : "0"}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
