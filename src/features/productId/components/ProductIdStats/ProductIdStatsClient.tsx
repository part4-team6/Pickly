"use client";
import { useEffect } from "react";

import { useProductStatsStore } from "../../libs/useProductStatsStore";
import ProductIdStatsBone from "./ProductIdStatsBone";
import { GetProductIdDetail } from "../../types";
import Heart from "../../../../../public/icons/Heart.png";
import Star from "../../../../../public/icons/star.svg";
import Talk from "../../../../../public/icons/Talk.png";

export default function ProductStatsClient({
  product,
}: {
  product: GetProductIdDetail;
}) {
  const {
    setRating,
    setReviewCount,
    setFavoriteCount,
    setIsFavorite,
    rating,
    reviewCount,
    favoriteCount,
  } = useProductStatsStore();

  useEffect(() => {
    setRating(product.rating);
    setReviewCount(product.reviewCount);
    setFavoriteCount(product.favoriteCount);
    setIsFavorite?.(product.isFavorite);
  }, [product]);

  return (
    <div className=" md:h-[244px] h-full text-amber-50 flex items-center flex-col gap-[29px]">
      <div className="lg:text-[20px] md:text-[16px] font-normal">상품통계</div>
      <div className="flex justify-between align-center md:flex-row flex-col gap-[15px]">
        <ProductIdStatsBone
          title="별점 평균"
          icon={Star}
          score={Number(rating.toFixed(1))}
          diffValue={Number(
            (rating - product.categoryMetric.rating).toFixed(1)
          )}
          unit=" 점"
        />
        <ProductIdStatsBone
          title="하트 수"
          icon={Heart}
          score={favoriteCount}
          diffValue={favoriteCount - product.categoryMetric.favoriteCount}
          unit=" 개"
        />
        <ProductIdStatsBone
          title="댓글 수"
          icon={Talk}
          score={reviewCount}
          diffValue={reviewCount - product.categoryMetric.reviewCount}
          unit=" 개"
        />
      </div>
    </div>
  );
}
