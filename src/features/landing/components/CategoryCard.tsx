"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  category: string;
  img: string;
  description: string;
  color: string;
  url: string;
  className?: string;
}

const CategoryCard = ({
  category,
  img,
  description,
  color,
  url,
  className,
}: Props) => {
  return (
    <Link href={url}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ scale: 1.03 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex flex-col w-full h-full aspect-square rounded-lg bg-cover cursor-pointer overflow-hidden ${className}`}
        style={{ backgroundImage: `url(${img})`, transformOrigin: "bottom" }}
      >
        <div
          className="relative flex flex-col bg-[#D9D9D980] rounded-b-lg h-[30%] w-full mt-auto lg:px-[19px] px-[4px]"
          style={{ containerType: "inline-size" }}
        >
          <h2
            className="text-black font-extrabold text-ellipsis line-clamp-1"
            style={{ fontSize: "clamp(8px, 8cqw, 48px)" }}
          >
            {category}
          </h2>
          <div className="w-[70%] shrink-0 mt-0 text-ellipsis">
            <span
              className="text-black font-medium leading-tight line-clamp-2  text-ellipsis"
              style={{ fontSize: "clamp(4px, 5cqw, 20px)" }}
            >
              {description}
            </span>
          </div>

          <button
            style={{ background: color }}
            className={`absolute flex items-center justify-center w-[10%] aspect-square lg:right-[17px] lg:bottom-[17px] md:right-[5px] md:bottom-[5px] right-[3px] bottom-[3px] rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out`}
          >
            <FaArrowRight
              className="lg:w-[14px] lg:h-[14px] w-[8px] h-[8px]"
              color="#000000"
            />
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
