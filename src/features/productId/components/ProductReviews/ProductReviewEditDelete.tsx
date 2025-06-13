"use client";
import { useState } from "react";

import ProductReviewEdit from "./ProductReviewEdit";
import ProductReviewDelete from "./ProductReviewDelete";

import { GetProductIdReviewsDetail } from "../../types";

interface ProductReviewEditDeleteProps {
  reviewId: number;
  initialReviewData: GetProductIdReviewsDetail;
  sort: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
}
export default function ProductReviewEditDelete({
  reviewId,
  initialReviewData,
  sort,
}: ProductReviewEditDeleteProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex gap-[10px] text-[#9FA6B2] ">
      <button
        className="underline cursor-pointer"
        onClick={() => setEditOpen(true)}
      >
        수정
      </button>
      <button
        className="underline cursor-pointer"
        onClick={() => setDeleteOpen(true)}
      >
        삭제
      </button>
      {editOpen && (
        <ProductReviewEdit
          open={editOpen}
          setOpen={setEditOpen}
          reviewId={reviewId}
          sort={sort}
          initialReviewData={initialReviewData}
        />
      )}
      {deleteOpen && (
        <ProductReviewDelete
          open={deleteOpen}
          setOpen={setDeleteOpen}
          reviewId={reviewId}
          sort={sort}
        />
      )}
    </div>
  );
}
