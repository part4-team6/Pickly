"use client";
import React from "react";
import { useRef, useState } from "react";
import CompareDropdown from "./CompareDropdown";
import useProductSearch from "../hooks/useProductSearch";
import { productService } from "../api/api";

type ProductStats = {
  rating: number;
  reviewCount: number;
  favoriteCount: number;
};

interface Props {
  label: string;
  tagColor: "green" | "pink";
  onProductSelectId?: (id: number | null) => void;
  dropdownRef?: React.RefObject<HTMLDivElement>;
  excludeId?: number | null;
  categoryFilter?: number | null;
  onProductStatsChange?: (stats: ProductStats) => void;
  onProductNameChange?: (name: string) => void;
  setShowResult?: (value: boolean) => void;
}

export default function CompareProductInputSecond({
  label,
  tagColor,
  onProductSelectId,
  excludeId,
  categoryFilter,
  onProductStatsChange,
  onProductNameChange
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const productList = useProductSearch(inputValue);

  const filteredProducts = productList.list.filter(
    (product) =>
      product.name.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      product.id !== excludeId &&
      (!categoryFilter || product.categoryId === categoryFilter)
  );

  const showDropdown = !selected && inputValue && filteredProducts.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(false);
  };

  const handleAddProductInternal = async (id: number, name: string) => {
    setInputValue(name);
    setSelected(true);
    onProductSelectId?.(id);
    onProductNameChange?.(name);

    try {
      const res = await productService.getProductsId(id);
      const { rating, reviewCount, favoriteCount } = res.data;
      onProductStatsChange?.({ rating, reviewCount, favoriteCount });
    } catch (error) {
      console.error("상품 정보 가져오기 실패:", error);
    }
  };

  const handleDelete = () => {
    setInputValue("");
    setSelected(false);
    onProductSelectId?.(null);
    inputRef.current?.focus();
  };

  const tagStyles =
    tagColor === "green"
      ? "bg-[#213639] text-[var(--color-green)]"
      : "bg-[#3A263B] text-[var(--color-pink)]";

  return (
    <div className="flex flex-col w-full lg:max-w-[350px] px-2">
      <label
        htmlFor="productInput"
        className="text-[16px] lg:text-base mb-2 font-light text-white"
      >
        {label}
      </label>

      <div className="relative w-full">
        {selected && (
          <div className="absolute z-10 flex items-center space-x-2 top-[13px] left-4">
            <div
              className={`flex items-center px-3 py-2 rounded-[6px] text-[16px] lg:text-[18px] ${tagStyles}`}
            >
              {inputValue}
              <button
                onClick={handleDelete}
                className="ml-2 rounded-[5px] bg-[#1F2937] w-5 h-5 flex items-center justify-center text-white text-[16px] leading-none"
                aria-label="삭제"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div
          className={`relative rounded-[8px] border w-full h-[70px] ${
            showDropdown
              ? "border-transparent bg-gradient-to-r from-[#5097fa] to-[#5363ff] p-[1px]"
              : "border-[#353542]"
          }`}
        >
          <div className="w-full h-full rounded-[8px] bg-[#252530]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                }
              }}
              placeholder={selected ? "" : "상품을 입력하세요"}
              readOnly={selected}
              className="w-full h-full border-0 rounded-[8px] bg-transparent text-white px-4 pl-[15px] focus:outline-none"
            />
          </div>
        </div>

        {showDropdown && (
          <CompareDropdown
            productList={{ list: filteredProducts }}
            handleAddProduct={handleAddProductInternal}
          />
        )}
      </div>
    </div>
  );
}
