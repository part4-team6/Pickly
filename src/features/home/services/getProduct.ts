import axios from "axios";
import { Product } from "../types/productType";

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  keyword?: string;
  categoryId?: number;
  order: "recent" | "rating" | "reviewCount";
  cursor?: number;
}

export async function getProducts({
  keyword,
  categoryId,
  order,
  cursor,
}: Props): Promise<Product> {
  const params: Record<string, any> = {};
  if (keyword) params.keyword = keyword;
  if (categoryId) params.categoryId = categoryId;
  if (order) params.order = order;
  if (cursor) params.cursor = cursor;

  try {
    const response = await axios.get(`${Base_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.log(`상품 가져오기 실패: ${error}`);
    throw error;
  }
}

export async function getProductsFetch({
  keyword,
  categoryId,
  order,
  cursor,
}: Props): Promise<Product> {
  const params: Record<string, any> = {};
  if (keyword) params.keyword = keyword;
  if (categoryId) params.category = categoryId;
  if (order) params.order = order;
  if (cursor) params.cursor = cursor;

  const query = new URLSearchParams(params).toString();

  console.log(query);

  try {
    const response = await fetch(`${Base_URL}/products?${query}`, {
      cache: "no-store",
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`상품 가져오기 실패: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`상품 가져오기 실패: ${error}`);
    throw error;
  }
}
