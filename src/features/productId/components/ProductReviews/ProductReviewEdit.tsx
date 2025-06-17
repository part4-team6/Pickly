"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
=======
import toast from "react-hot-toast";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518

import ProductReviewStarModal from "../modal/ProductReviewModal/ProductReviewStarModal";
import ProductIdGetModal from "../modal/ProductReviewModal/ProductIdGetModal";
import ProductReviewInputModal from "../modal/ProductReviewModal/ProductReviewInputModal";
import BaseButton from "@/components/shared/BaseButton";
import ReviewBaseModal from "../modal/ProductReviewModal/ReviewBaseModal";

<<<<<<< HEAD
import { GetProductIdReviewsDetail } from "../../types";
import useGetProductId from "../../hooks/useGetProductId";
=======
import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";
import { GetProductIdReviewsDetail } from "../../types";
import { useGetProductId } from "../../hooks/useGetProductId";
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
import { reviewService } from "../../api";

interface ProductReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  reviewId: number;
  initialReviewData: GetProductIdReviewsDetail;
}

export default function ProductReviewEdit({
  open,
  setOpen,
  reviewId,
  initialReviewData,
}: ProductReviewModalProps) {
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState(initialReviewData.content);
  const [rating, setRating] = useState<number>(initialReviewData.rating);
  const [images, setImages] = useState<string[]>(
    initialReviewData.reviewImages.map((img) => img.source)
  );
  // 상품 ID를 가져오기 위한 커스텀 훅 사용
  const { product } = useGetProductId();

  // 리뷰 patch 요청을 위한 useMutation 훅
  const patchReviewMutation = useMutation({
<<<<<<< HEAD
    mutationFn: () =>
=======
    mutationFn: ({ accessToken }: { accessToken: string }) =>
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      reviewService.patchReviews({
        reviewId,
        content: reviewText,
        rating: rating,
        images: images,
<<<<<<< HEAD
      }),
    onSuccess: () => {
      alert("리뷰가 수정되었습니다!");
=======
        accessToken,
      }),
    onSuccess: () => {
      toast.success("리뷰가 수정되었습니다!");
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["reviews", product.id, "recent"],
      });
    },
    onError: () => {
<<<<<<< HEAD
      alert("리뷰 수정에 실패했습니다.");
    },
  });
  const handleSubmit = () => {
    if (!product) return;
    patchReviewMutation.mutate();
=======
      toast.error("리뷰 수정에 실패했습니다.");
    },
  });
  const handleSubmit = async () => {
    const { accessToken } = await checkLoginStatus();
    if (!accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    if (!product) return;
    patchReviewMutation.mutate({ accessToken });
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  };

  const isSubmitEnabled = reviewText.trim().length > 0;

  return (
    <ReviewBaseModal
      isOpen={open}
      onClose={() => setOpen(false)}
      modalClassName="custom-modal-class"
      contentClassName="custom-content-class"
    >
      <div className="w-full h-full flex gap-[40px] flex-col justify-between">
        <ProductIdGetModal />
        <div className="flex flex-col gap-[20px] h-fit">
          {/* 별점 입력 모달 */}
          <ProductReviewStarModal onChange={setRating} initialRating={rating} />
          {/* 리뷰 내용 입력 모달 */}
          <ProductReviewInputModal
            onTextChange={setReviewText}
            onImageUrlsChange={setImages}
            initialText={initialReviewData.content}
            initialImages={initialReviewData.reviewImages.map(
              (img) => img.source
            )}
          />
        </div>
        <BaseButton
          className="py-[22px] text-[18px] font-semibold"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}
        >
          수정하기
        </BaseButton>
      </div>
    </ReviewBaseModal>
  );
}
