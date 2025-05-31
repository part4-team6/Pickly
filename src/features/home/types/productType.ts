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
