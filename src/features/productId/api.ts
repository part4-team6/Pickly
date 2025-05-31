import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 로그인시 지워야 함, 좋아요버튼 테스트 용
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzkzLCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4MzU0NjI5LCJpc3MiOiJzcC1tb2dhem9hIn0.PZJlV0LShr2yPDET0tjTDrgTydcQCcCR6medOrkv9zg";
class ProductService {
  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`);
  }
  getProductsIdReviews(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}/reviews`);
  }
}

class UserService {
  getUser() {
    return axios.get(`${BASE_URL}/users/me`);
  }
}

class ReviewService {
  postReviews({
    productId,
    content,
    rating,
    images,
  }: {
    productId: number;
    content: string;
    rating: number;
    images?: string[];
  }) {
    return axios.post(
      `${BASE_URL}/reviews`,
      {
        productId,
        content,
        rating,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  }

  postReviewsLike(reviewId: number) {
    return axios.post(
      `${BASE_URL}/reviews/${reviewId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  }

  deleteReviews(reviewId: number) {
    return axios.delete(`${BASE_URL}/reviews/${reviewId}/like`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
}

export const productService = new ProductService();
export const userService = new UserService();

export const reviewService = new ReviewService();
