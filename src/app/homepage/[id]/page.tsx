import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";
import { getProductsFetch } from "@/features/home/services/getProduct";
import HighStarProduct from "@/features/home/components/HighStarProduct";
import MoreProducts from "@/features/home/components/MoreProducts";
import AddEditProductModal from "@/components/shared/AddEditProductModal";
import SortComponent from "@/features/home/components/SortComponent";
import SearchPage from "@/components/shared/SearchPage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodeParams = decodeURIComponent(id);

  return {
    title: `Pickly | ${decodeParams}`,
    description: `${decodeParams}와 관련된 모든 상품을 확인해보세요.`,
    openGraph: {
      title: `Pickly | ${decodeParams}`,
      description: `${decodeParams}와 관련된 모든 상품을 Pickly에서 확인해보세요.`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    sort?: "recent" | "reviewCount" | "rating";
    modal?: string;
  }>;
}) {
  const { id: categoryId } = await params;
  const sp = await searchParams;
  const decodeParams = decodeURIComponent(categoryId);
  let products;

  const categoryIndexMap: Record<string, number> = {
    검색: 0,
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

  const categoryNumber = categoryIndexMap[decodeParams] ?? undefined;

  if (categoryNumber >= 1) {
    products = await getProductsFetch({
      order: sp.sort,
      categoryId: categoryNumber,
    });
  }

  return (
    <div className="overflow-x-visible">
      <header className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-center 2xl:px-[150px] md:px-0 px-[20px] mt-[100px]">
        <div className="fixed 2xl:left-[150px] lg:left-[40px] md:left-0 md:flex hidden">
          <Category categoryId={categoryId} />
        </div>

        {categoryNumber === 0 ? (
          <div className="2xl:flex flex-col justify-center items-center mt-[60px] hidden lg:mb-[50px] mb-[30px] lg:w-[950px] md:w-[510px] w-[340px]">
            <div className="lg:w-[50vw] md:w-[60vw] w-[90vw] max-w-[1000px]">
              <SearchPage searchParams={sp} />
            </div>
          </div>
        ) : (
          <div className="2xl:flex flex-col mt-[60px] hidden lg:mb-[50px] mb-[30px] lg:max-w-[950px] md:max-w-[510px] max-w-[340px] lg:w-[50vw] md:w-[60vw] w-[90vw]">
            <div className="flex flex-row items-center justify-between">
              <span className="lg:text-[24px] text-[#F1F1F5] font-semibold ">
                {decodeParams}의 모든 상품
              </span>
              <SortComponent />
            </div>

            <HighStarProduct products={products} />
            <MoreProducts
              key={decodeParams}
              nextCursor={products?.nextCursor}
              categoryId={categoryNumber}
              queryKey={["products", categoryNumber, undefined]}
              order={sp.sort}
            />
          </div>
        )}

        <div className="flex flex-col overflow-x-hidden lg:ml-0 md:ml-[180px]">
          <div className="lg:fixed 2xl:right-[150px] lg:right-[40px] md:right-0">
            <ReviewerRanking />
          </div>

          {/* 데스크톱 사이즈가 아닌 경우 */}
          {categoryNumber === 0 ? (
            <div className="2xl:hidden flex flex-col mt-[60px] md:ml-[25px] w-full lg:mb-[50px] mb-[30px] ">
              <div className="lg:w-[50vw] md:w-[60vw] w-[90vw] max-w-[620px]">
                <SearchPage searchParams={sp} />
              </div>
            </div>
          ) : (
            <div className="2xl:hidden flex flex-col mt-[60px] md:ml-[25px] lg:mb-[50px] mb-[30px] lg:w-[50vw] md:w-[60vw] w-[90vw] max-w-[620px]">
              <div className="flex md:flex-row flex-col items-center justify-between">
                <span className="lg:text-[24px] text-[#F1F1F5] font-semibold mr-auto">
                  {decodeParams}의 모든 상품
                </span>
                <div className="ml-auto md:mt-0 mt-[30px]">
                  <SortComponent />
                </div>
              </div>

              <HighStarProduct products={products} />
              <MoreProducts
                key={decodeParams}
                nextCursor={products?.nextCursor}
                categoryId={categoryNumber}
                queryKey={["products", categoryNumber, undefined]}
                order={sp.sort}
              />
            </div>
          )}
        </div>

        <div className="fixed lg:right-[180px] md:right-[30px] right-[20px] lg:bottom-[90px] md:bottom-[90px] bottom-[40px]">
          <FloatingButton />
        </div>
      </div>

      <AddEditProductModal
        buttonPlaceholder="추가하기"
        modalType="addProduct"
        purpose="상품 추가"
      />
    </div>
  );
}
