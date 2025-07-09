"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetProductId } from "@/features/productId/hooks/useGetProductId";
import useGetUser from "../../../hooks/useGetUser";
import ModalProductName from "../ModalProductName";
import BaseButton from "@/components/shared/BaseButton";
import CloseX from "@/../public/icons/close-x.png";

interface ProductCompareChangeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProductCompareModal({
  open,
  setOpen,
}: ProductCompareChangeModalProps) {
  const { product } = useGetProductId();

  const {
    compareList,
    setBaseCompareProductId,
    baseCompareProductId,
    addToCompare,
  } = useGetUser();
  const router = useRouter();

  const handleCompareChange = () => {
    setOpen(false);
    router.push(`/compare`);
  };

  useEffect(() => {
    if (!open || !product?.id) return;

    if (baseCompareProductId !== product.id) {
      setBaseCompareProductId(product.id);
    }

    addToCompare(product);
  }, [
    open,
    product?.id,
    baseCompareProductId,
    setBaseCompareProductId,
    addToCompare,
  ]);
  const sameCategoryCompareList = compareList.filter(
    (item) => item.category.id === product?.category?.id
  );
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-[500px] h-auto bg-[#1C1C22] rounded-2xl flex flex-col items-center gap-[40px] p-8 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="close"
              className="cursor-pointer w-[24px] h-[24px] absolute top-[20px] right-[20px]"
              onClick={() => setOpen(false)}
            />

            <p className="text-white text-[20px] font-semibold text-center mt-8">
              지금 보신 &#39;{product?.name}&#39; 어떤 상품과 비교할까요?
            </p>

            {sameCategoryCompareList.length > 0 && (
              <div className="flex gap-[20px] flex-col">
                {sameCategoryCompareList.slice(-3, -1).map((item) => (
                  <ModalProductName key={item.id} productId={item.id}>
                    {item.name}
                  </ModalProductName>
                ))}
              </div>
            )}
            <BaseButton
              className="w-full h-[65px] py-[14px] text-[16px] font-semibold"
              onClick={handleCompareChange}
            >
              교체하기
            </BaseButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
