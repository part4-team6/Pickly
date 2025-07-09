import CategoryChip from "@/components/CategoryChip";
import { GetProductIdDetail } from "../../types";
import Image from "next/image";

import CopyLinkImage from "./CopyLinkImage";
import ProductIdDetailHeart from "./ProductIdDetailHeart";
import ProductIdDetailButton from "./ProductIdDetailButton";

export default function ProductIdDetailClient({
  product,
}: {
  product: GetProductIdDetail;
}) {
  return (
    <div className="flex md:items-start items-center justify-between lg:gap-[60px] md:gap-[40px] text-[#f1f1f5] md:flex-row flex-col gap-[20px]">
      <div className="lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px] w-[220px] h-[220px] flex justify-center items-center overflow-hidden bg-[#1C1C22]">
        <Image
          src={product.image}
          alt="상품 이미지"
          width={306}
          height={306}
          priority
          className=" lg:w-[306px] lg:h-[306px] md:w-[242px] md:h-[242px] w-[220px] h-[220px] object-contain"
        />
      </div>

      <div className="lg:w-[545px] md:w-[384px]">
        <div className="flex items-center justify-between mb-[9.5px]">
          <CategoryChip
            category={product.category.name}
            className="text-[12px]"
          />
          <CopyLinkImage product={product} />
        </div>

        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div className="lg:text-2xl text-[20px] font-semibold">
                {product.name}
              </div>
              <ProductIdDetailHeart
                productId={product.id}
                initialIsFavorite={product.isFavorite}
              />
            </div>
          </div>
          <div className="lg:text-[16px] md:text-[14px] font-normal">
            {product.description}
          </div>
          <ProductIdDetailButton product={product} />
        </div>
      </div>
    </div>
  );
}
