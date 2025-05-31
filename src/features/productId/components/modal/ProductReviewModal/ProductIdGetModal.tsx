import useGetProductId from "../../../hooks/useGetProductId";

export default function ProductIdGetModal() {
  const { product } = useGetProductId();

  if (!product) return null;

  return (
    <div className="flex flex-col gap-[10px]">
      <div>{product.category.name}</div>
      <div className="font-semibold text-[24px]">{product.name}</div>
    </div>
  );
}
