import { create } from "zustand";
import { GetProductIdDetail } from "@/features/productId/types";

interface ProductStoreState {
  productId: number | null;
  productDetail: GetProductIdDetail | null;
  setProductId: (id: number) => void;
  setProductDetail: (detail: GetProductIdDetail) => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  productId: null,
  productDetail: null,

  setProductId: (id) => set({ productId: id }),
  setProductDetail: (detail) => set({ productDetail: detail }),
}));
