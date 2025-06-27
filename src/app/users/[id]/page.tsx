import Header from "@/components/shared/Header";
import { getUserProfile } from "@/features/Profile/api/getUserProfile";
import { getUserProducts } from "@/features/Profile/api/getUserProducts";
import ActivitySection from "@/features/Profile/components/ActivitySection";
import ProductTabSection from "@/features/Profile/components/ProductTabSection";
import ProfileCard from "@/features/Profile/components/ProfileCard";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/features/Profile/api/getMyProfile";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);

  // 기본적으로 유저 프로필 정보는 조회
  const user = await getUserProfile(userId);

  let myProfile = null;
  try {
    myProfile = await getMyProfile();
  } catch {
    myProfile = null;
  }

  if (myProfile?.id === userId) {
    redirect("/mypage");
  }

  const initialProducts = await getUserProducts(user.id, "reviewed");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 ">
        <Header />
      </header>
      <div
        className="mt-[160px] px-[30px] height: 100vh; md:px-[117px] lg:mx-auto lg:px-[20px] 
      lg:flex lg:justify-center lg:gap-[70px] max-w-[1380px]  "
      >
        <div className="h-auto ">
          <ProfileCard user={user} isMe={user.isMe} />
        </div>
        <div className="w-full flex flex-col mb-[60px] ">
          <span className="text-[#F1F1F5] font-semibold text-[18px] lg:text-[20px]">
            활동 내역
          </span>
          <ActivitySection user={user} />
          <ProductTabSection
            userId={user.id}
            initialTab="reviewed"
            initialProducts={initialProducts}
          />
        </div>
      </div>
    </>
  );
}
