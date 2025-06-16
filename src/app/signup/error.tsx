"use client";
import BaseButton from "@/components/shared/BaseButton";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/homepage");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <img
          src="/alarm.svg"
          alt="error Image"
          className="md:w-[166px]  md:h-[166px] w-[100px] h-[100px]"
        />
        <p className="font-semibold text-3xl text-[var(--color-white)] mt-[24px]">비정상적인 접근입니다.</p>

        <BaseButton
          className="lg:w-[440px] lg:h-[55px] md:w-[335px] md:h-[50px] w-[250px] h-[40px] lg:mt-[76px] md:mt-[36px] mt-[24px] md:text-[16px] text-[12px] font-extrabold"
          onClick={handleClick}
        >
          홈 화면으로 이동
        </BaseButton>
      </div>
    </div>
  );
}
