import { ProductList } from "@/features/home/types/productType";
import React from "react";

interface Props {
  product: ProductList;
}

const ProductCard = ({
  product
}: Props) => {
  return (
    <div className="flex flex-col items-center p-[10px] lg:w-[300px] lg:h-[308px] md:w-[247px] md:h-[256px] w-[160px] h-[183px] rounded-xl bg-[#252530] border-[1px] border-[#353542]">
      <img
        src={product.image}
        alt="productImage"
        className="object-contain w-auto lg:max-h-[200px] md:max-h-[160px] max-h-[98px]"
      />

      <div className="flex flex-col lg:mt-[20px] md:mt-[20px] mt-[10px] w-full lg:px-[6px]">
        <span className="lg:text-[18px] md:text-[16px] text-[14px] text-[#F1F1F5] font-medium">
          {product.name}
        </span>

        <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between lg:mt-[10px] md:mt-[10px] mt-[5px] lg:text-[16px] md:text-[14px] text-[12px] font-light">
          <div className="flex flex-row items-center text-[#6E6E82] ">
            <span>리뷰 {product.reviewCount}</span>
            <span className="lg:ml-[15px]">찜 {product.favoriteCount}</span>
          </div>

          <span className="text-[#9FA6B2]">⭐️ {product.rating.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
