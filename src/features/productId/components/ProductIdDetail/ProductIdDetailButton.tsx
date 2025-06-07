"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { GetProductIdDetail } from "../../types";
import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../../hooks/useGetUser";

import ProductReviewModal from "../modal/ProductReviewModal/ProductReviewModal";
import ProductCompareModal from "../modal/ProductCompareModal/ProductCompareModal";
import ProductComparePlusModal from "../modal/ProductCompareModal/ProductComparePlusModal";

type ModalTypes = "review" | "compare" | "comparePlus";

export default function ProductIdDetailButton({
  product,
}: {
  product: GetProductIdDetail;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user, compareList, addToCompare } = useGetUser();
  const isOwner = user?.id === product.writerId;

  const searchParams = useSearchParams();
  const router = useRouter();
  const sameCategoryCompareList = compareList.filter(
    (item) => item.category.id === product?.category?.id
  );

  //ProductComparePlusModal 관련 상태
  const [comparePlusModalMessage, setComparePlusModalMessage] = useState("");
  const [comparePlusButtonMessage, setComparePlusButtonMessage] = useState("");
  const activieModal = searchParams.get("modal") as ModalTypes | null;

  const openModal = (modalName: ModalTypes) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", modalName);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 로그인 리다이렉트 핸들러
  const handleLoginRedirect = () => {
    closeModal();
    router.push("/signin");
  };
  // 비교하기 리다이렉트 핸들러
  const handleCompareRedirect = () => {
    closeModal();
    router.push("/compare");
  };
  // 비교하기 모달
  const handleCompareClick = () => {
    if (!product || !sameCategoryCompareList) return;

    if (user === null) {
      setComparePlusModalMessage("로그인이 필요합니다.");
      setComparePlusButtonMessage("로그인하러가기");
      openModal("comparePlus");
      return;
    }

    const isAlreadyInList = sameCategoryCompareList.some(
      (item) => Number(item.id) === Number(product.id)
    );

    if (isAlreadyInList) {
      setComparePlusModalMessage("이미 비교 목록에 있는 상품입니다.");
      openModal("comparePlus");
      return;
    }

    if (sameCategoryCompareList.length === 0) {
      addToCompare(product);
      setComparePlusModalMessage("비교 상품으로 등록되었습니다!");
      openModal("comparePlus");
    } else if (sameCategoryCompareList.length === 1) {
      addToCompare(product);
      setComparePlusModalMessage(
        "비교 상품으로 등록되었습니다.\n바로 확인해 보시겠어요?"
      );
      setComparePlusButtonMessage("확인하러가기");
      openModal("comparePlus");
    } else {
      openModal("compare");
    }
  };

  // 쿠키 이용하면 로딩중 버튼 갯수 빠르게 로딩 가능
  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[126px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={() => openModal("review")}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mt-[15px] md:mt-[0px]"
          >
            편집하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[123.5px] lg:py-[22px] md:px-[70px] md:py-[18px] px-[123px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={() => openModal("review")}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="lg:px-[58.5px] lg:py-[22px] md:px-[33px] md:py-[18px] px-[136px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
        </div>
      )}
      {activieModal === "review" && (
        <ProductReviewModal
          open={activieModal === "review"}
          setOpen={closeModal}
        />
      )}
      {activieModal === "compare" && (
        <ProductCompareModal
          open={activieModal === "compare"}
          setOpen={closeModal}
        />
      )}
      {activieModal === "comparePlus" && (
        <ProductComparePlusModal
          open={activieModal === "comparePlus"}
          setOpen={closeModal}
          message={comparePlusModalMessage}
          buttonText={comparePlusButtonMessage}
          onButtonClick={
            comparePlusButtonMessage === "로그인하러가기"
              ? handleLoginRedirect
              : comparePlusButtonMessage === "확인하러가기"
              ? handleCompareRedirect
              : undefined
          }
        />
      )}
    </>
  );
}
