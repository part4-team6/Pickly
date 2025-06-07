"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reviewService } from "../api";

export default function useLikeButton(
  reviewId: number,
  initialLikeCount: number,
  initialIsLiked: boolean = false
) {
  const [isLikedState, setIsLikedState] = useState(initialIsLiked);
  const [isLikeCount, setIsLikeCount] = useState(initialLikeCount);

  const likeMutation = useMutation({
    mutationFn: () => reviewService.postReviewsLike(reviewId),
    onSuccess: () => {
      setIsLikedState(true);
      setIsLikeCount((prev) => prev + 1);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => reviewService.deleteReviewsLike(reviewId),
    onSuccess: () => {
      setIsLikedState(false);
      setIsLikeCount((prev) => prev - 1);
    },
  });

  const toggleLike = () => {
    if (isLikedState) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return { isLikedState, isLikeCount, toggleLike };
}
