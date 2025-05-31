"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { reviewService } from "../api";

export default function useLikeButton() {
  // id도 추가로 받아와야 함. +  토큰도 받아와야 함

  // 목데이터 삭제 예정
  const mockData = {
    list: [
      {
        id: 1574,
        rating: 5,
        content: "와 이거 진짜 좋아요",
        likeCount: 0,
        createdAt: "2025-05-28T12:25:57.611Z",
        updatedAt: "2025-05-28T12:25:57.611Z",
        userId: 793,
        productId: 1231,
        user: {
          id: 793,
          nickname: "라몽이",
          image: null,
        },
        reviewImages: [
          {
            id: 1816,
            source: "https://image.yes24.com/goods/125993371/XL",
          },
        ],
        isLiked: false,
      },
    ],
    nextCursor: null,
  };

  const [isLikedState, setIsLikedState] = useState(false);
  const [islikeCount, setIsLikeCount] = useState(mockData.list[0].likeCount);

  //   const { reviews } = useGetProductsIdReviews(); -> 로그인 되면 다시 수정

  const likeMutation = useMutation({
    mutationFn: () => reviewService.postReviewsLike(mockData.list[0].id),
    onSuccess: () => {
      setIsLikedState(true);
      setIsLikeCount((prevCount) => prevCount + 1);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => reviewService.deleteReviews(mockData.list[0].id),
    onSuccess: () => {
      setIsLikedState(false);
      setIsLikeCount((prevCount) => prevCount - 1);
    },
  });

  const toggleLike = () => {
    if (isLikedState) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return { isLikedState, islikeCount, toggleLike };
}
