import React from "react";

import { productService } from "../../api";
import ProductIdStatsBone from "./ProductIdStatsBone";

import Heart from "../../../../../public/icons/Heart.png";
import Star from "../../../../../public/icons/Star.png";
import Talk from "../../../../../public/icons/Talk.png";

interface ProductIdReviewProps {
  params: { id: string };
}

export default async function generateStaticParams({
  params,
}: ProductIdReviewProps) {
  const { data: product } = await productService.getProductsId(
    Number(params.id)
  );
  return (
    <div className="w-[940px] h-[244px] text-amber-50 flex flex-col gap-[29px]">
      <div className="text-[20px] font-normal">상품통계</div>
      <div className="flex justify-between align-center ">
        <ProductIdStatsBone
          title="별점 평균"
          icon={Star}
          score={product?.rating}
          diffValue={product?.categoryMetric?.rating - product?.rating}
          unit=" 점"
        />
        <ProductIdStatsBone
          title="하트 수"
          icon={Heart}
          score={product?.favoriteCount}
          diffValue={
            product?.categoryMetric?.favoriteCount - product?.favoriteCount
          }
          unit=" 개"
        />
        <ProductIdStatsBone
          title="댓글 수"
          icon={Talk}
          score={product?.reviewCount}
          diffValue={
            product?.categoryMetric?.reviewCount - product?.reviewCount
          }
          unit=" 개"
        />
      </div>
    </div>
  );
}
