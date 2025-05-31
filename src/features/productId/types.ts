export interface GetProductIdReviews {
  nextCursor: number;
  list: GetProductIdDetail[];
}

export interface GetProductIdDetail {
  user: {
    image: string;
    nickname: string;
    id: number;
  };
  reviewImages: [
    {
      source: string;
      id: number;
    }
  ];
  productId: number;
  userId: number;
  updatedAt: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  content: string;
  rating: number;
  id: number;
}
