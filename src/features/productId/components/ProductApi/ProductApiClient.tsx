import { getMusicvideo } from "@/features/productId/hooks/useGetMusicvideo";
import ProductYouTubeSection from "./ProductYouTubeSection";
import { YoutubeVideo } from "@/features/productId/youtube-video";
import { GetProductIdDetail } from "@/features/productId/types";
export default async function ProductApiClient({
  searchQuery,
  initialProduct,
  initialVideos,
}: {
  searchQuery: string;
  initialProduct: GetProductIdDetail;
  initialVideos?: YoutubeVideo[];
}) {
  const videos = initialVideos ?? (await getMusicvideo(searchQuery));

  return (
    <ProductYouTubeSection
      initialVideos={videos}
      initialProduct={initialProduct}
    />
  );
}
