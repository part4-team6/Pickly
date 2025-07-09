"use client";
import BaseButton from "@/components/shared/BaseButton";
import { useRouter } from "next/navigation";
import errorImg from "@/../public/animations/error.json";
import Lottie from "lottie-react";

export default function Error() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/homepage");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-[200px] md:w-[250px]">
          <Lottie animationData={errorImg} loop={true} />
        </div>
        <p className="font-semibold text-3xl text-[var(--color-white)]">
          Oops! Something wrong.
        </p>

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
