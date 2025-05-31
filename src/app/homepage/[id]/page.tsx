import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ProductCard from "@/components/shared/ProductCard";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";
import { getProductsFetch } from "@/features/home/services/getProduct";

// next 15 부터 동적 라우팅은 비동기로 처리된다
// 따라서 params도 promise 형태로 감싸야 한다
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = await params;
  const decodeParams = decodeURIComponent(categoryId);

  const categoryIndexMap: Record<string, number> = {
    음악: 1,
    "영화/드라마": 2,
    "강의/책": 3,
    호텔: 4,
    "가구/인테리어": 5,
    식당: 6,
    전자기기: 7,
    화장품: 8,
    "의류/악세서리": 9,
    앱: 10,
  };

  const categoryNumber = categoryIndexMap[decodeParams] ?? 0;

  console.log("현재 카테고리:", decodeParams); // "전자기기"
  console.log("매핑된 번호:", categoryNumber);

  const products = await getProductsFetch({
    order: "recent",
    categoryId: categoryNumber,
  });

  console.log(products);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-999">
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-center 2xl:px-[180px] md:px-0 px-[20px] mt-[100px]">
        <div className="fixed 2xl:left-[180px] md:left-0 md:flex hidden">
          <Category categoryId={categoryId} />
        </div>

        <div className="lg:flex flex-col mt-[60px] hidden lg:mb-[50px] mb-[30px] lg:w-[950px] md:w-[510px] w-[340px]">
          <span className="lg:text-[24px] text-[#F1F1F5] font-semibold">
            {decodeParams}의 모든 상품
          </span>

          <div
            className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[20px]
          lg:mt-[30px]"
          >
            {products.list.slice(0, 9).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:ml-0 md:ml-[180px]">
          <div className="lg:fixed 2xl:right-[180px]">
            <ReviewerRanking />
          </div>

          {/* 데스크톱 사이즈가 아닌 경우 */}
          <div className="lg:hidden flex flex-col mt-[60px] md:ml-[25px] md:w-[510px] w-[335px] lg:mb-[50px] mb-[30px]">
            <span className="text-[20px] text-[#F1F1F5] font-semibold">
              {decodeParams}의 모든 상품
            </span>

            <div className="grid grid-cols-2 gap-[15px] items-center justify-center mt-[30px]">
              {products.list.slice(0, 9).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="fixed lg:right-[180px] md:right-[30px] right-[20px] lg:bottom-[90px] md:bottom-[90px] bottom-[40px]">
          <FloatingButton />
        </div>
      </div>
    </div>
  );
}
