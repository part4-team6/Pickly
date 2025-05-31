"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";

interface Props {
  placeholder: string;
  selected: boolean;
}

const CategoryTab = ({ placeholder, selected }: Props) => {
  const router = useRouter();

  const textColor = selected ? "#F1F1F5" : "#6E6E82";
  const backGroundColor = selected ? "#252530" : "#1C1C22";
  console.log(`${placeholder} :${selected}`);

  const handleSelect = (category: string) => {
    router.push(`/homepage/${encodeURIComponent(category)}`);
    router.refresh();
  };

  return (
    <div
      className={`lg:h-[50px] lg:px-[20px] lg:py-[15px] h-[45px] px-[20px] py-[14px] rounded-lg lg:text-[16px] text-[14px] text-[${textColor}] font-medium bg-[${backGroundColor}] cursor-pointer ${
        selected ? `hover:[#252530]` : `hover:bg-[#2e2e36]`
      }`}
      onClick={() => handleSelect(placeholder)}
    >
      {placeholder}
    </div>
  );
};

export default CategoryTab;
