"use client";
import { useEffect } from "react";

import ProductIdStatsBone from "./ProductIdStatsBone";

import { useProductIDStatsStore } from "../../libs/useProductStatsStore";
import { GetProductIdDetail } from "../../types";

import Heart from "@/../public/icons/Heart.png";
import Star from "@/../public/icons/star.svg";
import Talk from "@/../public/icons/Talk.png";

export default function ProductStatsClient({
  product,
}: {
  product: GetProductIdDetail;
}) {
  const {
    rating,
    reviewCount,
    favoriteCount,
    setRating,
    setReviewCount,
    setFavoriteCount,
    setIsFavorite,
  } = useProductIDStatsStore();

  const currentRating = rating[product.id];
  const currentReviewCount = reviewCount[product.id];
  const currentFavoriteCount = favoriteCount[product.id];

  useEffect(() => {
    if (
      currentRating === undefined &&
      currentReviewCount === undefined &&
      currentFavoriteCount === undefined
    ) {
      setRating(product.id, product.rating);
      setReviewCount(product.id, product.reviewCount);
      setFavoriteCount(product.id, product.favoriteCount);
      setIsFavorite(product.id, product.isFavorite);
    }
  }, [
    product.id,
    product.rating,
    product.reviewCount,
    product.favoriteCount,
    product.isFavorite,
  ]);

  const isLoading =
    currentRating === undefined ||
    currentReviewCount === undefined ||
    currentFavoriteCount === undefined;
  return (
    <div className="md:h-[244px] h-full min-h-[200px] text-amber-50 flex items-start flex-col gap-[29px]">
      <div className="lg:text-[20px] md:text-[16px] font-normal">상품통계</div>

      {isLoading ? (
        <div className="flex justify-between align-center md:flex-row flex-col gap-[15px] w-full">
          <div className="w-full h-[190px] bg-gray-700 rounded-md animate-pulse" />
          <div className="w-full h-[190px] bg-gray-700 rounded-md animate-pulse" />
          <div className="w-full h-[190px] bg-gray-700 rounded-md animate-pulse" />
        </div>
      ) : (
        <div className="flex justify-between align-center md:flex-row flex-col gap-[15px] w-full">
          <ProductIdStatsBone
            title="별점 평균"
            icon={Star}
            score={Number(currentRating.toFixed(1))}
            diffValue={Number(
              (currentRating - product.categoryMetric.rating).toFixed(1)
            )}
            unit=" 점"
          />
          <ProductIdStatsBone
            title="하트 수"
            icon={Heart}
            score={Number(currentFavoriteCount.toFixed(1))}
            diffValue={Number(
              (
                currentFavoriteCount - product.categoryMetric.favoriteCount
              ).toFixed(1)
            )}
            unit=" 개"
          />
          <ProductIdStatsBone
            title="댓글 수"
            icon={Talk}
            score={Number(currentReviewCount.toFixed(1))}
            diffValue={Number(
              (currentReviewCount - product.categoryMetric.reviewCount).toFixed(
                1
              )
            )}
            unit=" 개"
          />
        </div>
      )}
    </div>
  );
}
