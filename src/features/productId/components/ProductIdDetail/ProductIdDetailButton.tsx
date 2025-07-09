"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

import { checkLoginStatus } from "../../hooks/checkLogin";
import { GetProductIdDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";

import useModalStore from "@/features/home/modals/store/modalStore";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";

const AddEditProductModal = dynamic(
  () => import("@/components/shared/AddEditProductModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductReviewModal = dynamic(
  () => import("../modal/ProductReviewModal/ProductReviewModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductCompareModal = dynamic(
  () => import("../modal/ProductCompareModal/ProductCompareModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductComparePlusModal = dynamic(
  () => import("@/components/shared/ProductComparePlusModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

type ModalTypes = "review" | "compare" | "comparePlus" | "editProduct";
type ModalAction = "login" | "goCompare" | "close";
export default function ProductIdDetailButton({
  product,
}: {
  product: GetProductIdDetail;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user, compareList, addToCompare } = useGetUser();
  const [isOwner, setIsOwner] = useState(false);
  const [modal, setModal] = useState<ModalTypes | null>(null);

  const { setName, setDescription, setImage, setClickedValue, setIsModalOpen } =
    useModalStore();

  useEffect(() => {
    const checkOwner = async () => {
      const { isLoggedIn } = await checkLoginStatus();
      if (!isLoggedIn) return;
      if (user?.id === product.writerId) {
        setIsOwner(true);
      }
    };
    checkOwner();
  }, [user, product.writerId]);

  const router = useRouter();

  const sameCategoryCompareList = useMemo(() => {
    return compareList.filter(
      (item) => item.category.id === product?.category?.id
    );
  }, [compareList, product?.category?.id]);

  //  ProductComparePlusModal 관련 상태
  const [comparePlusModal, setComparePlusModal] = useState({
    message: "",
    buttonText: "",
    action: "close" as ModalAction,
  });

  const openModal = (modalName: ModalTypes) => setModal(modalName);

  const closeModal = () => {
    setModal(null);
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
  // 로그인 확인
  const requireLogin = async (): Promise<boolean> => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();

    if (!isLoggedIn || !accessToken) {
      setComparePlusModal({
        message: "로그인이 필요한 서비스입니다.",
        buttonText: "로그인하러가기",
        action: "login",
      });

      openModal("comparePlus");

      return false;
    }
    return true;
  };
  // 비교하기 모달
  // 이미 비교 목록에 있는 상품인지 확인
  const showAlreadyInListModal = () => {
    setComparePlusModal({
      message: "이미 비교 목록에 있는 \n상품입니다.",
      buttonText: "확인",
      action: "close",
    });
    openModal("comparePlus");
  };
  // 비교 상품으로 등록되었을 때 모달
  const showCompareAddedModal = () => {
    setComparePlusModal({
      message: "비교 상품으로 등록되었습니다!",
      buttonText: "확인",
      action: "close",
    });
    openModal("comparePlus");
  };

  // 비교 상품으로 등록되었을 때 모달
  const showComparePlusModal = () => {
    setComparePlusModal({
      message: "비교 상품으로 등록되었습니다.\n바로 확인해 보시겠어요?",
      buttonText: "확인하러가기",
      action: "goCompare",
    });
    openModal("comparePlus");
  };
  const handleCompareClick = () => {
    const isAlreadyInList = sameCategoryCompareList.some(
      (item) => Number(item.id) === Number(product.id)
    );
    if (isAlreadyInList) {
      showAlreadyInListModal();
      return;
    }
    if (sameCategoryCompareList.length === 0) {
      addToCompare(product);
      showCompareAddedModal();
    } else if (sameCategoryCompareList.length === 1) {
      addToCompare(product);
      showComparePlusModal();
    } else {
      openModal("compare");
    }
  };

  // 리뷰 작성하기 모달 핸들러 쿠키
  const handleReviewClick = async () => {
    if (!(await requireLogin())) {
      return;
    }
    openModal("review");
  };
  const handleProductEdit = async () => {
    if (!(await requireLogin())) return;
    setName(product.name || "");
    setDescription(product.description || "");
    setImage(product.image || "");
    setClickedValue(product.category.name);
    openModal("editProduct");
    setIsModalOpen(true);
  };

  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[126px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={handleReviewClick}
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
            onClick={handleProductEdit}
          >
            편집하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[123.5px] lg:py-[22px] md:px-[70px] md:py-[18px] px-[123px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={handleReviewClick}
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
      {modal === "review" && <ProductReviewModal open setOpen={closeModal} />}

      {modal === "compare" && <ProductCompareModal open setOpen={closeModal} />}

      {modal === "comparePlus" && (
        <ProductComparePlusModal
          open
          setOpen={closeModal}
          message={comparePlusModal.message}
          buttonText={comparePlusModal.buttonText}
          onButtonClick={
            comparePlusModal.action === "login"
              ? handleLoginRedirect
              : comparePlusModal.action === "goCompare"
              ? handleCompareRedirect
              : undefined
          }
        />
      )}

      {modal === "editProduct" && (
        <AddEditProductModal
          buttonPlaceholder="수정하기"
          modalType="editProduct"
          purpose="상품 수정"
          productinfo={product}
        />
      )}
    </>
  );
}
