import Image from "next/image";

import ThumbsUpButton from "@/components/shared/ThumbsUpButton";
import { formatDate } from "../../../../lib/utils/datetime";
import { GetProductIdReviewsDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";
import ProductReviewEditDelete from "./ProductReviewEditDelete";
import Star from "../../../../../public/icons/star.svg";
import DefaultIProfileImage from "../../../../../public/defaultIProfileImage.jpeg";

export default function ProductReviewsListComponent({
  review,
}: {
  review: GetProductIdReviewsDetail;
}) {
  const { user } = useGetUser();
  const isOwner = user?.id === review.userId;
  return (
    <div className="text-[#F1F1F5] flex justify-between lg:p-[30px] p-[20px] bg-[#252530] rounded-2xl md:flex-row flex-col gap-[30px] md:gap-[0px]">
      <div className="flex items-start gap-[10px]">
        <Image
          src={review.user.image || DefaultIProfileImage}
          alt="프로필 이미지"
          width={43}
          height={43}
          className="rounded-full md:w-[36px] md:h-[36px]"
        />
        <div>
          <div className="lg:text-[16px] text-[14px] font-medium">
            {review.user.nickname}
          </div>
          <div>
            <div className="flex gap-[2px]">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <Image
                  key={idx}
                  src={Star}
                  alt="별점"
                  width={20}
                  height={20}
                  className="inline-block w-[12px] h-[12px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[680px] md:w-[455px] flex flex-col gap-[20px]">
        <div className="lg:text-[16px] text-[12px] font-medium">
          {review.content}
        </div>
        <div>
          {review.reviewImages.length > 0 && (
            <div className="flex lg:gap-[20px] gap-[10px]">
              {review.reviewImages.map((image) => (
                <img
                  key={image.id}
                  src={image.source}
                  alt="Review Image"
                  className="lg:w-[100px] md:w-[80px] w-[60px] lg:h-[100px] md:h-[80px] h-[60px] rounded-xl"
                />
              ))}
            </div>
          )}
          <></>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-[20px] lg:text-[14px] text-[12px] md:text-[12px]">
            <div className=" text-[#6E6E82]">
              {formatDate(review.createdAt)}
            </div>
            {isOwner && (
              <ProductReviewEditDelete
                reviewId={review.id}
                initialReviewData={review}
              />
            )}
          </div>

          <div>
            <ThumbsUpButton
              reviewId={review.id}
              initialLikeCount={review.likeCount}
              initialIsLiked={review.isLiked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
