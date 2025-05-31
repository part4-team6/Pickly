"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import ImageDelete from "../../../../../../public/icons/image-delete.png";
import PlusImage from "../../../../../../public/icons/plus-image.png";

interface PreviewImage {
  id: string;
  url: string;
  file: File;
}
interface ProductReviewInputModalProps {
  onTextChange: (text: string) => void;
}
export default function ProductReviewInputModal({
  onTextChange,
}: ProductReviewInputModalProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<PreviewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 텍스트 변경 핸들러
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => {
        if (editingId) {
          return prev.map((img) =>
            img.id === editingId ? { ...img, file, url: imageUrl } : img
          );
        }
        if (prev.length >= 3) return prev;
        return [
          ...prev,
          {
            id: String(Date.now()),
            url: imageUrl,
            file,
          },
        ];
      });
      setEditingId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleImageClick = (id: string) => {
    setEditingId(id);
    fileInputRef.current?.click();
  };

  const handleAddClick = () => {
    setEditingId(null);
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-[20px] h-fit">
      {/* 텍스트 입력 나중에 컴포넌트로 교체예쩡*/}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="리뷰를 입력해주세요"
        className="w-full outline-0 resize-none overflow-y-auto break-words 
                   rounded-[8px] bg-[#252530] p-[20px] 
                   placeholder-[var(--color-deepGray)] text-[var(--color-white)]"
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
