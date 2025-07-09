"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { TextboxReview } from "@/features/productId/components/modal/ProductReviewModal/TextboxReview";
import { imageService } from "@/features/productId/api";
import ImageDelete from "@/../public/icons/image-delete.png";
import PlusImage from "@/../public/icons/plus-image.png";
import { checkLoginStatus } from "@/features/productId/hooks/checkLogin";

interface ImageData {
  id: string;
  url: string;
  file: File;
}

interface ProductReviewInputModalProps {
  onTextChange: (text: string) => void;
  onImageUrlsChange: (images: string[]) => void;
  initialText?: string;
  initialImages?: string[];
  accessToken?: string | null;
}

export default function ProductReviewInputModal({
  onTextChange,
  onImageUrlsChange,
  initialText = "",
  initialImages = [],
}: ProductReviewInputModalProps) {
  const [text, setText] = useState(initialText);
  const [images, setImages] = useState<ImageData[]>(() =>
    initialImages.map((url) => ({
      id: String(Date.now() + Math.random()),
      url,
      file: new File([], ""),
    }))
  ); // 초기 URL을 ImageData 형태로 변환
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 텍스트 변경 핸들러
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  // 이미지 접근성 검사 함수
  const checkImageAccessible = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // 이미지 변경 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { isLoggedIn, accessToken } = await checkLoginStatus();
    if (!isLoggedIn || typeof accessToken !== "string") {
      toast.error("로그인이 필요합니다.");
      return;
    }
    try {
      const uploadedUrl = await imageService.postImage(file, accessToken);
      const isAccessible = await checkImageAccessible(uploadedUrl);
      if (!isAccessible) {
        toast.error("이미지명이 한글이면 불러올 수 없습니다.");
        return;
      }
      setImages((prev) => {
        if (editingId) {
          return prev.map((img) =>
            img.id === editingId ? { ...img, file, url: uploadedUrl } : img
          );
        } else {
          if (prev.length >= 3) return prev;
          return [...prev, { id: String(Date.now()), file, url: uploadedUrl }];
        }
      });

      setEditingId(null);
    } catch (err) {
      const error = err as Error;
      if (error?.message === "403") {
        toast.error("권한이 없습니다. 다시 로그인해주세요.");
      } else {
        toast.error("이미지 업로드에 실패했습니다.");
      }
    }
  };
  // 이미지 삭제 핸들러
  const handleDeleteClick = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  // 이미지 클릭 핸들러
  const handleImageClick = useCallback((id: string) => {
    setEditingId(id);
    fileInputRef.current?.click();
  }, []);

  // 이미지 추가 핸들러
  const handleAddClick = useCallback(() => {
    setEditingId(null);
    fileInputRef.current?.click();
  }, []);

  // 이미지 URL 변경 시 콜백 호출
  useEffect(() => {
    onImageUrlsChange(images.map((img) => img.url));
  }, [images, onImageUrlsChange]);

  return (
    <div className="flex flex-col lg:gap-[20px] md:gap-[15px] gap-[10px]">
      {/* 텍스트 입력 나중에 컴포넌트로 교체예쩡 텍스트필드 오류 있음 */}
      <TextboxReview
        placeholder="리뷰를 입력해주세요"
        value={text}
        onChange={handleTextChange}
        maxLength={500}
        className="md:h-[150px] h-[120px] lg:w-[540px] md:w-[510px] w-[295px]  text-[16px]"
      />

      {/* 이미지 업로드 섹션 */}
      <div className="flex flex-row-reverse gap-[20px] w-full justify-end">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative lg:w-[160px] w-[140px] lg:h-[160px] h-[140px] "
          >
            <Image
              src={image.url}
              alt="미리보기 이미지"
              width={140}
              height={140}
              unoptimized
              loading="lazy"
              onClick={() => handleImageClick(image.id)}
              className="lg:w-[160px] w-[140px] lg:h-[160px] h-[140px] object-cover rounded-xl cursor-pointer"
            />

            <button
              onClick={() => handleDeleteClick(image.id)}
              className="absolute top-[5px] right-[5px] bg-black/60 rounded-xl"
            >
              <Image src={ImageDelete} alt="삭제 버튼" width={24} height={24} />
            </button>
          </div>
        ))}

        {/* 추가 버튼: 최대 3개까지 */}
        {images.length < 3 && (
          <button
            onClick={handleAddClick}
            className="lg:w-[160px] md:w-[135px] w-[140px] cursor-pointer lg:h-[160px] md:h-[135px] h-[140px] flex items-center justify-center bg-[#252530] border border-[#353542] rounded-xl"
          >
            <Image
              src={PlusImage}
              alt="이미지 추가 버튼"
              width={34}
              height={34}
              className="block "
            />
          </button>
        )}
      </div>

      {/* 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
