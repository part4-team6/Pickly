const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ReviewRanking {
  id: number;
  nickname: string;
  image: string;
  description: string;
  reviewCount: number;
  followersCount: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export default async function getReviewerRanking(): Promise<ReviewRanking[]> {
  try {
    const response = await fetch(`${Base_URL}/users/ranking`, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`랭킹 불러오기 실패:${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("랭킹 불러오기 요청 실패:", error);
    throw error;
  }
}
