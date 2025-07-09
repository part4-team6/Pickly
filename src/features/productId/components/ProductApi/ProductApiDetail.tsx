import {
  fetchArtistAlbum,
  fetchGoogleSearch,
  fetchMovieSearch,
} from "../../hooks/fetchOpenAi";
import LazyLoadSection from "../ProductIdDetail/LazyLoadSection";
import { GetProductIdDetail } from "@/features/productId/types";
import { getMusicvideo } from "@/features/productId/hooks/useGetMusicvideo";

import { YoutubeVideo } from "@/features/productId/youtube-video";
import ProductApiClient from "./ProductApiClient";
import ProductSpotifyClient from "./ProductSpotifyClient";
import MapView from "./MapView";

// JSON 파싱 함수
function parseJsonSafe(jsonStr: string) {
  try {
    let str = jsonStr.trim();

    if (str.startsWith("```")) {
      const lines = str.split("\n");
      if (lines.length >= 3) {
        str = lines.slice(1, -1).join("\n").trim();
      }
    }
    return JSON.parse(str);
  } catch (error) {
    console.error("JSON 파싱 실패", error, "원본:", jsonStr);
    return null;
  }
}

// 카테고리별 데이터 처리 함수
//음악
async function handleMusicCategory(combinedText: string) {
  const albumInfoRaw = await fetchArtistAlbum(combinedText);
  const albumInfoObj = parseJsonSafe(albumInfoRaw);
  const artistName = albumInfoObj?.artist?.replace(/\(.*?\)/g, "").trim() ?? "";
  const albumName = albumInfoObj?.album?.trim() ?? "";

  const searchQuery =
    artistName.length > 0
      ? `${artistName} ${albumName} official music video`.trim()
      : combinedText;

  let videos: YoutubeVideo[] = [];
  try {
    videos = await getMusicvideo(searchQuery);
  } catch (e) {
    console.error("유튜브 fetch 실패 - videos:", e);
  }

  return { artistName, albumName, searchQuery, videos };
}
// 영화
async function handleMovieCategory(combinedText: string) {
  const movieInfoRaw = await fetchMovieSearch(combinedText);
  const movieInfoObj = parseJsonSafe(movieInfoRaw);
  const parsedMovie = movieInfoObj?.trailer ?? "";

  let videoTrailer: YoutubeVideo[] = [];
  try {
    videoTrailer = await getMusicvideo(parsedMovie);
  } catch (e) {
    console.error("유튜브 fetch 실패 - videoTrailer:", e);
  }

  return { parsedMovie, videoTrailer };
}
// 장소(호텔, 음식점 등) 카테고리
async function handlePlaceCategory(combinedText: string) {
  const placeInfoRaw = await fetchGoogleSearch(combinedText);
  const placeInfoObj = parseJsonSafe(placeInfoRaw);
  const parsedPlace = placeInfoObj?.place ?? "";

  return { parsedPlace };
}
// 카테고리 상수 정의
const CATEGORY = {
  MUSIC: 1,
  MOVIE: 2,
  HOTEL: 4,
  RESTAURANT: 6,
} as const;

export default async function ProductApiDetail({
  product,
}: {
  product: GetProductIdDetail;
}) {
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const combinedText = `${product.name}\n${product.description}`;
  const categoryId = product.category?.id ?? 0;

  let artistName = "";
  let albumName = "";
  let searchQuery = "";
  let parsedPlace = "";
  let parsedMovie = "";
  let videos: YoutubeVideo[] = [];
  let videoTrailer: YoutubeVideo[] = [];

  // 카테고리1 음악과 뮤직비디오
  if (categoryId === CATEGORY.MUSIC) {
    const musicData = await handleMusicCategory(combinedText);
    artistName = musicData.artistName;
    albumName = musicData.albumName;
    searchQuery = musicData.searchQuery;
    videos = musicData.videos;
  }

  // 카테고리 2 영화 or 드라마
  if (categoryId === CATEGORY.MOVIE) {
    const movieData = await handleMovieCategory(combinedText);
    parsedMovie = movieData.parsedMovie;
    videoTrailer = movieData.videoTrailer;
  }

  // 카테고리 4 호텔 그리고 카테고리 6 음식점
  if (categoryId === CATEGORY.HOTEL || categoryId === CATEGORY.RESTAURANT) {
    const placeData = await handlePlaceCategory(combinedText);
    parsedPlace = placeData.parsedPlace;
  }

  return (
    <>
      <LazyLoadSection>
        {categoryId === 1 && (
          <div className="flex gap-[20px] flex-col ">
            <div className="flex items-center lg:gap-[20px] gap-[15px] flex-col md:flex-row">
              <ProductApiClient
                searchQuery={searchQuery}
                initialVideos={videos}
                initialProduct={product}
              />
              <ProductSpotifyClient
                artistName={artistName}
                albumName={albumName}
                product={product}
              />
            </div>
          </div>
        )}
        {(categoryId === 4 || categoryId === 6) && parsedPlace && (
          <div>
            <MapView place={parsedPlace} />
          </div>
        )}
        {categoryId === 2 && (
          <ProductApiClient
            searchQuery={parsedMovie}
            initialVideos={videoTrailer}
            initialProduct={product}
          />
        )}
      </LazyLoadSection>
    </>
  );
}
