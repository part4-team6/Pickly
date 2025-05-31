"use client";
import { useSearchParams, useRouter } from "next/navigation";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../hooks/useGetUser";
import ProductReviewModal from "./modal/ProductReviewModal/ProductReviewModal";

export default function ProductIdReviewButton({
  productUserId,
}: {
  productUserId: number;
}) {
  // useGetUser 훅을 사용하여 사용자 정보를 가져옴
  const { user } = useGetUser();
  const isOwner = user?.id === productUserId;

  // 모달 열기 및 닫기 로직 (이렇게 할 수 있다니...ㄷㄷ...)
  const searchParams = useSearchParams();
  const router = useRouter();
  const isReviewModalOpen = searchParams.get("modal") === "review";
  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "review");
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between">
          리뷰작성하기 클릭시 로그인 여부에 따라 모달
          <BaseButton
            disabled={false}
            className="px-[123.5px] py-[22px] font-semibold text-[18px] "
            onClick={openModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[58.5px] py-[22px] font-semibold text-[18px]"
          >
            비교하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[43.5px] py-[22px] font-semibold text-[18px] "
            onClick={openModal}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
          >
            편집하기
          </TypeButton>
        </div>
      )}
      {isReviewModalOpen && (
        <ProductReviewModal open={isReviewModalOpen} setOpen={closeModal} />
      )}
    </>
  );
}
