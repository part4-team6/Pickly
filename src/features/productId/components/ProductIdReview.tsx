import Image from "next/image";

import { productService } from "../api";
import ProductIdReviewButton from "./ProductIdReviewButton";

import HeartInactive from "../../../../public/icons/heart-inactive.svg";
import KakaoLink from "../../../../public/images/kakao-link.png";
import LinkShare from "../../../../public/images/link-share.png";

interface ProductIdReviewProps {
  params: Promise<{ id: string }>;
}

export default async function ProductIdReview({
  params,
}: ProductIdReviewProps) {
  const { data: product } = await productService.getProductsId(
    Number((await params).id)
  );

  if (!product) return <div>상품 정보가 없습니다.</div>;

  return (
    <div className="flex items-start justify-between gap-10 text-[#f1f1f5]">
      <img src={product.image} width={306} height={228} alt="상품 이미지" />

      <div className="w-[545px] ">
        <div className="pb-[9.5px]">{product.category.name}</div>
        <div className="flex items-center justify-between pb-[49px]">
          <div className="flex items-center gap-[15px] justify-between">
            <div className="text-2xl font-semibold">{product.name}</div>
            {/* 토큰 완료되면 좋아요 활성화 / 비활성화화 */}
            <Image src={HeartInactive} alt="좋아요" width={28} height={28} />
          </div>
          <div className="flex items-center justify-between gap-[10px] ">
            <Image
              src={KakaoLink}
              alt="카카오 공유 링크"
              width={28}
              height={28}
            />
            <Image src={LinkShare} alt="링크 공유" width={28} height={28} />
          </div>
        </div>
        <div className="text-[16px] pb-[60px] font-normal">
          {product.description}
        </div>
        {/* 여기는 csr로 해야함 -> 로그인 여부에 따라 모양이 달라짐 */}
        <ProductIdReviewButton productUserId={product.userId} />
      </div>
    </div>
  );
}
