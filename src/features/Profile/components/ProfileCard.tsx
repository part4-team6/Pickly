"use client";
import { User } from "@/features/Profile/types/user";
import defaultProfileImage from "../../../../public/defaultProfileImage.jpeg";
import Image from "next/image";
import FollowCounts from "./FollowCounts";
import FollowButton from "./FollowButton";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import useAuthentication from "@/features/header/hooks/useAuthentication";
import BaseButton from "@/components/shared/BaseButton";
import EditProfileModal from "./EditProfileModal";

interface Props {
  user: User;
  isMe?: boolean;
}

export default function ProfileCard({ user, isMe }: Props) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [followersCount, setFollowersCount] = useState(user.followersCount);
  const { isAuthenticated } = useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-[60px] px-[20px] py-[30px] w-full h-auto rounded-lg bg-[#252530] border border-[#353542] md:px-[30px] lg:w-[340px] lg:mb-0 lg:sticky lg:top-[120px]">
      <div className="w-full h-auto flex flex-col items-center gap-[30px] lg:gap-10">
        <div className="relative flex items-center justify-center w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] mb-7">
          <div
            className="absolute w-[220%] h-[220%] rounded-full blur-[70px] opacity-50 z-0
                 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, #91caff 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full h-full rounded-full overflow-hidden z-10">
            {user?.image && user.image !== "https://none" ? (
              <Image src={user.image} alt="유저 이미지" fill />
            ) : (
              <Image src={defaultProfileImage} alt="유저 기본 이미지" fill />
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col ">
        <span className="text-center text-[20px] font-semibold text-[white] hover:cursor-pointer lg:text-[24px] mb-7">
          {user.nickname}
        </span>
        {user.description && (
          <div className="text-[14px] font-normal text-[#6E6E82] lg:text-[16px] mb-7 break-words ">
            {user.description}
          </div>
        )}
      </div>
      <FollowCounts user={{ ...user, followersCount }} />
      <div className="mt-12">
        {isMe ? (
          <div className="w-full flex flex-col gap-[10px] md:gap-[15px] lg:gap-5 ">
            <BaseButton
              className="  font-semibold md:h-[55px] lg:h-[65px] h-[50px] lg:text-[18px] "
              onClick={() => setIsModalOpen(true)}
            >
              프로필 편집
            </BaseButton>
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            {isAuthenticated && <LogoutButton />}
          </div>
        ) : (
          <FollowButton
            userId={user.id}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            setFollowersCount={setFollowersCount}
            router={undefined}
          />
        )}
      </div>
    </div>
  );
}
