"use client";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import ProductReviewsListComponent from "./ProductReviewsListComponent";
import { productService } from "../../api";
import { GetProductIdReviews } from "../../types";

const SpinningWidget = dynamic(
  () => import("@/components/shared/SpinningWidget"),
  {
    loading: () => <p>로딩중입니다...</p>,
  }
);

interface ProductIdReviewProps {
  initialData?: GetProductIdReviews;
  productId: number;
  order: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined;
}

export default function ProductReviewsInfinite({
  initialData,
  productId,
  order,
}: ProductIdReviewProps) {
  const ref = useRef(null);
  // useInfiniteQuery를 사용하여 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      GetProductIdReviews,
      Error,
      InfiniteData<GetProductIdReviews, number | undefined>,
      readonly (string | number | undefined)[],
      number | undefined
    >({
      queryKey: ["reviews", productId, order],
      queryFn: ({ pageParam }) =>
        productService
          .getProductsIdReviews(productId, order, pageParam)
          .then((res) => res.data),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      ...(order === "recent" && initialData
        ? {
            initialData: {
              pages: [initialData],
              pageParams: [undefined],
            },
          }
        : {}),
    });

  // IntersectionObserver를 사용하여 스크롤이 마지막 요소에 도달했을 때 다음 페이지를 가져옴
  useEffect(() => {
    if (!ref.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, hasNextPage, isFetchingNextPage, order]);

  const allReviews = data?.pages.flatMap((page) => page?.list ?? []) ?? [];
  if (allReviews.length === 0) {
    return (
      <div className="text-center text-[#6E6E82] md:pt-[200px] pt-[100px] text-[16px] lg:text-[20px] font-medium">
        첫 리뷰를 작성해보세요!
      </div>
    );
  }

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div
          key={i}
          className="flex flex-col md:gap-[20px] gap-[15px] md:mb-[20px] mb-[15px]"
        >
          {page?.list?.map((review) => (
            <ProductReviewsListComponent
              key={review.id}
              review={review}
              productId={productId}
            />
          ))}
        </div>
      ))}

      <div ref={ref} />
      {isFetchingNextPage && (
        <div className="flex justify-center w-full mt-[10px]">
          <SpinningWidget />
        </div>
      )}
    </div>
  );
}
