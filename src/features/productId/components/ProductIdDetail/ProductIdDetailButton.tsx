"use client";

import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../../hooks/useGetUser";

export default function ProductIdDetailButton({
  productUserId,
}: {
  productUserId: number;
}) {
  // useGetUser 훅을 사용하여 사용자 정보를 가져옴
  const { user } = useGetUser();
  const isOwner = user?.id === productUserId;
  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between">
          리뷰작성하기 클릭시 로그인 여부에 따라 모달
          <BaseButton
            disabled={false}
            className="px-[123.5px] py-[22px] font-semibold text-[18px] "
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[58.5px] py-[22px] font-semibold text-[18px]"
          >
            비교하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <BaseButton
            disabled={false}
            className="px-[43.5px] py-[22px] font-semibold text-[18px] "
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="px-[43.5px] py-[22px] font-semibold text-[18px]"
          >
            편집하기
          </TypeButton>
        </div>
      )}
    </>
  );
}
