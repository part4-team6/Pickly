import ProductReviewsInfinite from "./ProductReviewsInfinite";
import { productService } from "../../api";

interface ProductIdReviewProps {
  params: {
    id: string;
  };
  searchParams?: {
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
  };
}

export default async function ProductReviewsList({
  params,
  searchParams,
}: ProductIdReviewProps) {
  const productId = Number(params.id);
  const order = searchParams?.order || "recent";

  if (isNaN(productId)) return null;

  const initialData = await productService
    .getProductsIdReviews(productId, order)
    .then((res) => res.data);

  console.log("initialData", initialData);
  return (
    <div className="mt-[60px]">
      <div className="text-[#f1f1f1] text-[20px] font-semibold flex justify-between mb-[30px]">
        <div>상품리뷰</div>
        <div>드롭다운 와야함</div>
      </div>
      <ProductReviewsInfinite
        initialData={initialData}
        productId={productId}
        order={order}
      />
    </div>
  );
}
