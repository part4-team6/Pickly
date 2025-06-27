"use client";
import { toast } from "react-hot-toast";
import TypeButton from "@/components/shared/TypeButton";
import { useRouter } from "next/navigation";
import ProductComparePlusModal from "@/components/shared/ProductComparePlusModal";
import { useState } from "react";
import { useUserStore } from "@/features/productId/libs/useUserStore";

export default function LogoutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const clearAll = useUserStore((state) => state.clearAll);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        clearAll();
        toast.success("로그아웃 되었습니다.");
        router.push("/");
      } else {
        toast.error("로그아웃 실패");
      }
    } catch {
      toast.error("에러가 발생했습니다.");
    } finally {
      setOpen(false);
    }
  };
  return (
    <>
      <TypeButton
        className=" hover:bg-[#FB4444] hover:text-[#ffffff] hover:border-none  font-semibold md:h-[55px] lg:h-[65px] lg:text-[18px] h-[50px]"
        type="tertiary"
        onClick={() => setOpen(true)}
      >
        로그아웃
      </TypeButton>
      <ProductComparePlusModal
        open={open}
        setOpen={setOpen}
        message={"로그아웃 하시겠습니까?"}
        buttonText="로그아웃하기"
        onButtonClick={handleLogout}
      />
    </>
  );
}
