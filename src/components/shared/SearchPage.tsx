"use client";
import MoreProducts from "@/features/home/components/MoreProducts";
import SortComponent from "@/features/home/components/SortComponent";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchPage = ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: "recent" | "reviewCount" | "rating";
  }>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [params, setParams] = useState<{
    [key: string]: "recent" | "reviewCount" | "rating";
  } | null>(null);

  useEffect(() => {
    const readParams = async () => {
      const sp = await searchParams;
      setParams(sp);
    };

    readParams();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
    inputRef.current?.blur();
  };

  return (
    <div className=" flex flex-col items-center w-full ">
      <form onSubmit={handleSearch} className="relative mx-auto">
        <input
          type="text"
          placeholder="상품 이름을 검색해 보세요"
          className="bg-[#252530] lg:w-[400px] lg:h-[56px] md:w-[300px] md:h-[50px] w-[250px] h-[40px] pr-[20px] md:pl-[60px] pl-[50px] py-[16px] text-[#6E6E82] rounded-[28px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
        />
        <CiSearch
          size={24}
          className="absolute lg:top-[16px] md:left-[20px] left-[15px] md:top-[15px] top-[10px] "
          color="#9FA6B2"
        />
      </form>

      <div className="flex flex-col mt-[30px] lg:mb-[50px] mb-[30px]">
        <div
          className={`ml-auto mb-[20px] ${search === "" ? "hidden" : "flex"}`}
        >
          <SortComponent />
        </div>
        <MoreProducts
          keyword={search}
          queryKey={["search", search, params?.sort ?? "recent"]}
          order={params?.sort ?? "recent"}
        />
      </div>
    </div>
  );
};

export default SearchPage;
