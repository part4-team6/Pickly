import ProductIdStats from "@/features/productId/components/ProductIdStats/ProductIdStats";
import Header from "@/components/shared/Header";
import ProductIdDetail from "@/features/productId/components/ProductIdDetail/ProductIdDetail";
import ProductReviewsFetch from "@/features/productId/components/ProductReviews/ProductReviewsFetch";
interface PageProps {
  params: {
    id: string;
  };
  searchParams: { order?: string };
}

export default function ProductIdPage({ params, searchParams }: PageProps) {
  return (
    <div>
      <Header />
      <div className="w-[940px] h-auto mx-auto mb-[120px] my-[60px]">
        <ProductIdDetail params={params} />
        <ProductIdStats params={params} />
        <ProductReviewsFetch params={params} searchParams={searchParams} />
      </div>
    </div>
  );
}

// return (
//   <div className="text-amber-50">
//     <div>
//       <div>프로필이미지</div>
//       <div>
//         <div>유저이름</div>
//         <div>별점</div>
//       </div>
//     </div>
//     <div>
//       <div>내용</div>
//       <div>사진 있을수도 없을수도</div>
//       <div>
//         <div>날짜</div>
//         <div>따봉</div>
//       </div>
//     </div>
//   </div>
// );
// }
