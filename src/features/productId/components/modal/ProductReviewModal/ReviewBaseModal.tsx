"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import CloseX from "@/../public/icons/close-x.png";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
  contentClassName?: string;
}

export default function ReviewBaseModal({
  isOpen,
  onClose,
  children,
  modalClassName,
  contentClassName,
}: BaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={`lg:w-[620px] md:w-[590px] lg:h-[698px] md:h-[632px] w-[335px] h-[518px] bg-[#1C1C22] rounded-2xl absolute flex flex-col ${modalClassName}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-end">
              <Image
                src={CloseX}
                alt="close"
                width={40}
                height={40}
                className="cursor-pointer lg:w-[40px] md:w-[36px] w-[24px] lg:h-[40px] md:h-[36px] h-[24px] relative top-[20px] right-[20px]"
                onClick={onClose}
              />
            </div>
            <div
              className={` ${contentClassName} md:mt-[30px] my-[10px] md:mx-[40px] mx-[20px] md:mb-[40px] mb-[20px] flex-grow flex flex-col`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
