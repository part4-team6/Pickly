"use client";
import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  onChange?: (rating: number) => void;
}

export default function ProductReviewStarModal({ onChange }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  // 별점이 반쪽인지 확인하는 함수
  const calculateIsHalf = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    return x < width / 2 ? index - 0.5 : index;
  };

  // 클릭 이벤트 핸들러
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const newRating = calculateIsHalf(e, index);
    setRating(newRating);
    onChange?.(newRating);
  };

  // 마우스 이동 이벤트 핸들러
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const hoverValue = calculateIsHalf(e, index);
    setHover(hoverValue);
  };

  // 마우스 리브 이벤트 핸들러
  const handleMouseLeave = () => setHover(null);

  // 별점의 채움 상태를 결정하는 함수
  const getFillType = (index: number): "full" | "half" | "empty" => {
    const value = hover ?? rating;
    if (value >= index) return "full";
    if (value >= index - 0.5) return "half";
    return "empty";
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-[16px] font-medium">별점</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => {
          const fill = getFillType(index);
          return (
            <div
              key={index}
              onClick={(e) => handleClick(e, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative w-8 h-8 cursor-pointer"
            >
              {/* 빈 별 */}
              <FaRegStar className="absolute w-full h-full text-gray-300" />

              {/* 반쪽 또는 꽉 찬 별 */}
              {fill !== "empty" && (
                <FaStar
                  className="absolute w-full h-full text-yellow-400"
                  style={{
                    clipPath:
                      fill === "half" ? "inset(0 50% 0 0)" : "inset(0 0 0 0)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
