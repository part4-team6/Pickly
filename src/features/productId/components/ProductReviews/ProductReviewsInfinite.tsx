"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import ProductReviewsListComponent from "./ProductReviewsListComponent";
import { productService } from "../../api";
import { GetProductIdReviews, GetProductIdDetail } from "../../types";

interface ProductIdReviewProps {
  initialData: GetProductIdReviews;
  productId: number;
  order: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
}

export default function ProductReviewsInfinite({
  initialData,
  productId,
  order,
}: ProductIdReviewProps) {
  const ref = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productId, order],
      queryFn: ({ pageParam = undefined }) =>
        productService
          .getProductsIdReviews(productId, order, pageParam)
          .then((res) => res.data),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,

      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
    });

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
  }, [ref, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i} className="flex flex-col gap-[20px]">
          {page.list.map((review: GetProductIdDetail) => (
            <ProductReviewsListComponent key={review.id} review={review} />
          ))}
        </div>
      ))}

      <div ref={ref} />
      {isFetchingNextPage && <p>로딩 중...</p>}
    </div>
  );
}
