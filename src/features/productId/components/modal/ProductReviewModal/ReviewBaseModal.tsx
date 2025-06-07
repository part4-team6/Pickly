"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import CloseX from "../../../../../../public/icons/close-x.png";

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
            className={`w-[620px] h-[698px] bg-[#1C1C22] rounded-2xl absolute flex flex-col items-end ${modalClassName}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CloseX}
              alt="close"
              className="cursor-pointer w-[40px] h-[40px] relative top-[20px] right-[20px]"
              onClick={onClose}
            />

            <div
              className={` ${contentClassName} mt-[30px] mx-[40px] mb-[40px] flex-grow flex flex-col`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
