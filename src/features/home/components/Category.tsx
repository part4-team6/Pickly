import React from "react";
import CategoryTab from "./CategoryTab";

const Category = ({ categoryId }: { categoryId: string }) => {
  const decodedId =
    typeof categoryId === "string" ? decodeURIComponent(categoryId) : "";

  console.log(decodedId);

  return (
    <nav className="flex flex-col lg:w-[220px] w-[180px] h-full px-[10px] bg-[#1C1C22]">
      <span className="lg:mt-[45px] mt-[45px] lg:ml-[20px] ml-[20px] lg:mb-0 mb-[20px] lg:text-[16px] text-[14px] text-[#F1F1F5] font-normal">
        카테고리
      </span>

      <div className="flex flex-col lg:mt-[20px] lg:w-[200px] md:w-[160px] gap-[4px]">
        <CategoryTab placeholder="음악" selected={decodedId === "음악"} />
        <CategoryTab
          placeholder="영화/드라마"
          selected={decodedId === "영화/드라마"}
        />
        <CategoryTab placeholder="강의/책" selected={decodedId === "강의/책"} />
        <CategoryTab placeholder="호텔" selected={decodedId === "호텔"} />
        <CategoryTab
          placeholder="가구/인테리어"
          selected={decodedId === "가구/인테리어"}
        />
        <CategoryTab placeholder="식당" selected={decodedId === "식당"} />
        <CategoryTab
          placeholder="전자기기"
          selected={decodedId === "전자기기"}
        />
        <CategoryTab placeholder="화장품" selected={decodedId === "화장품"} />
        <CategoryTab
          placeholder="의류/악세서리"
          selected={decodedId === "의류/악세서리"}
        />
        <CategoryTab placeholder="앱" selected={decodedId === "앱"} />
      </div>
    </nav>
  );
};

export default Category;
