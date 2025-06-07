import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 로그인시 지워야 함, 좋아요버튼 테스트 용
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzkzLCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4MzU0NjI5LCJpc3MiOiJzcC1tb2dhem9hIn0.PZJlV0LShr2yPDET0tjTDrgTydcQCcCR6medOrkv9zg";
class ProductService {
  getProducts({
    keyword,
    category,
    order,
    cursor,
  }: {
    keyword?: string;
    category?: number;
    order?: "recent" | "rating" | "reviewCount";
    cursor?: number;
  }) {
    let url = `${BASE_URL}/products`;
    if (keyword) url += `?keyword=${keyword}`;
    if (category) url += `&category=${category}`;
    if (order) url += `&order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;
    return axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }

  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
  getProductsIdReviews(
    productId: number,
    order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount" | undefined,
    cursor?: number
  ) {
    let url = `${BASE_URL}/products/${productId}/reviews`;

    if (order) url += `?order=${order}`;
    if (cursor) url += `&cursor=${cursor}`;

    return axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }

  postProductsFavorite(productId: number) {
    return axios.post(
      `${BASE_URL}/products/${productId}/favorite`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  }

  deleteProductsFavorite(productId: number) {
    return axios.delete(`${BASE_URL}/products/${productId}/favorite`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
}

class UserService {
  getUser() {
    return axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
}

class ReviewService {
  async postReviews({
    productId,
    content,
    rating,
    images,
  }: {
    productId: number;
    content: string;
    rating: number;
    images: string[];
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
          Accept: "application/json",
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
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  }

  deleteReviewsLike(reviewId: number) {
    return axios.delete(`${BASE_URL}/reviews/${reviewId}/like`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }

  async patchReviews({
    reviewId,
    content,
    rating,
    images,
  }: {
    reviewId: number;
    content: string;
    rating: number;
    images: string[];
  }) {
    const formattedImages = images.map((url) => ({ source: url }));
    return axios.patch(
      `${BASE_URL}/reviews/${reviewId}`,
      {
        content,
        rating,
        images: formattedImages,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
  }

  deleteReviews(reviewId: number) {
    return axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
}

class ImageService {
  async postImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<{ url: string }>(
      `${BASE_URL}/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return response.data.url;
  }
}
export const productService = new ProductService();
export const userService = new UserService();
export const reviewService = new ReviewService();
export const imageService = new ImageService();
