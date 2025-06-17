export type Product = {
  id: number;
  name: string;
  categoryId:number;
};

export type ProductsResponse = {
  list: Product[];
};

export interface GetProductIdDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
    categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}