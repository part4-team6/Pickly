"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import { Textbox } from "@/components/input/Textbox";
import { imageService } from "@/features/productId/api";
import ImageDelete from "../../../../../../public/icons/image-delete.png";
import PlusImage from "../../../../../../public/icons/plus-image.png";

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

  // 이미지 변경 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await imageService.postImage(file);

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
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteClick = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // 이미지 클릭 핸들러
  const handleImageClick = (id: string) => {
    setEditingId(id);
    fileInputRef.current?.click();
  };

  // 이미지 추가 핸들러
  const handleAddClick = () => {
    setEditingId(null);
    fileInputRef.current?.click();
  };

  // 이미지 URL 변경 시 콜백 호출
  useEffect(() => {
    onImageUrlsChange(images.map((img) => img.url));
  }, [images, onImageUrlsChange]);

  return (
    <div className="flex flex-col gap-[20px] h-fit">
      {/* 텍스트 입력 나중에 컴포넌트로 교체예쩡 텍스트필드 오류 있음 */}
      <Textbox
        size="S"
        placeholder="리뷰를 입력해주세요"
        value={text}
        onChange={handleTextChange}
        maxLength={500}
        className="h-[150px] w-[540px] text-[16px]"
      />

      {/* 이미지 업로드 섹션 */}
      <div className="flex flex-row-reverse gap-[20px] w-full justify-end">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.url}
              alt="미리보기 이미지"
              onClick={() => handleImageClick(image.id)}
              className="w-[160px] h-[160px]  object-cover rounded-xl cursor-pointer"
            />
            <button
              onClick={() => handleDeleteClick(image.id)}
              className="absolute top-[5px] right-[5px] bg-black/60 rounded-xl"
            >
              <Image
                src={ImageDelete}
                alt="삭제 버튼"
                width={24}
                height={24}
                className=" cursor-pointer"
              />
            </button>
          </div>
        ))}

        {/* 추가 버튼: 최대 3개까지 */}
        {images.length < 3 && (
          <button
            onClick={handleAddClick}
            className="w-[160px] cursor-pointer h-[160px] flex items-center justify-center bg-[#252530] border border-[#353542] rounded-xl"
          >
            <Image
              src={PlusImage}
              alt="이미지 추가 버튼"
              width={34}
              height={34}
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
