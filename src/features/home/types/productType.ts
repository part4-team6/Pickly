export interface Product {
  nextCursor: number;
  list: {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    favoriteCount: number;
    categoryId: number;
    writerId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface ProductList {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  writerId: number;
  createdAt: string;
  updatedAt: string;
}
[];

export interface ProductInfo {
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
