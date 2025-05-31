import FloatingButton from "@/components/shared/FloatingButton";
import Header from "@/components/shared/Header";
import Category from "@/features/home/components/Category";
import ProductCard from "@/components/shared/ProductCard";
import ReviewerRanking from "@/features/home/components/ReviewerRanking";
import { getProductsFetch } from "@/features/home/services/getProduct";

export default async function HomePage({ params }: { params: { id: string } }) {
  const hotProduct = await getProductsFetch({ order: "reviewCount" });

  const starProduct = await getProductsFetch({ order: "rating" });

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-999">
        <Header />
      </header>

      <div className="relative flex flex-row lg:justify-center 2xl:px-[180px] md:px-0 px-[20px] mt-[100px] lg:mx-auto">
        <div className="fixed 2xl:left-[180px] md:left-0 md:flex hidden">
          <Category categoryId={params.id} />
        </div>

        <div className="lg:flex flex-col mt-[60px] hidden lg:mb-[50px] mb-[30px]">
          <span className="lg:text-[24px] text-[#F1F1F5] font-semibold">
            지금 핫한 상품{" "}
            <span className="bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text text-transparent">
              TOP 6
            </span>
          </span>

          <div
            className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[20px]
          lg:mt-[30px]"
          >
            {hotProduct.list.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <span className="lg:text-[24px] text-[#F1F1F5] font-semibold mt-[80px]">
            별점이 높은 상품
          </span>

          <div
            className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[20px]
          lg:mt-[30px]"
          >
            {starProduct.list.slice(0, 6).map((product) => (
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
              지금 핫한 상품{" "}
              <span className="bg-gradient-to-r from-[#5097fa] to-[#5363ff] bg-clip-text text-transparent">
                Top 6
              </span>
            </span>

            <div className="grid grid-cols-2 gap-[15px] items-center justify-center mt-[30px]">
              {hotProduct.list.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <span className="text-[20px] text-[#F1F1F5] font-semibold mt-[60px]">
              별점이 높은 상품
            </span>

            <div className="grid grid-cols-2 gap-[15px] items-center justify-center mt-[30px]">
              {starProduct.list.slice(0, 6).map((product) => (
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
