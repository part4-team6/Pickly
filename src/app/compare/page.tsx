import Header from "@/components/shared/Header";
import CompareClient from "@/features/compare/components/CompareClient";

export default function Compare() {
  return (
    <div>
      <Header />
      <div className="flex flex-col my-[40px]">
        <CompareClient />
      </div>
    </div>
  );
}
