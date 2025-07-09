"use client";
import React from "react";
import { useEffect } from "react";
import { useProductStore } from "@/features/productId/libs/productStore";

import { GetProductIdDetail } from "@/features/productId/types";
import { YoutubeVideo } from "../../youtube-video";
import LoadingSkeletonYoutube from "./LoadingSkeletonYoutube";

interface InnerYouTubeSectionProps {
  initialVideos?:
    | YoutubeVideo[]
    | Array<{
        videoId: string;
        title: string;
        thumbnail?: string;
        publishedAt?: string;
      }>;
  initialProduct: GetProductIdDetail;
}

export default function ProductYouTubeSection({
  initialVideos = [],
  initialProduct,
}: InnerYouTubeSectionProps) {
  const videos = initialVideos;
  // Zustand 스토어에서 제품 상세 정보와 설정 함수 가져오기
  const setProductDetail = useProductStore((state) => state.setProductDetail);
  const product = useProductStore((state) => state.productDetail);

  // 비디오 ID와 제목을 추출하는 함수
  function getVideoId(video: any): string | undefined {
    if (video?.id?.videoId) return video.id.videoId;

    if (video?.videoId) return video.videoId;
    return undefined;
  }

  // 비디오 제목을 추출하는 함수
  function getTitle(video: any): string | undefined {
    if (video?.snippet?.title) return video.snippet.title;

    if (video?.title) return video.title;
    return undefined;
  }

  // 초기 제품 데이터 설정
  useEffect(() => {
    if (initialProduct) {
      setProductDetail(initialProduct);
    }
  }, [initialProduct, setProductDetail]);

  if (!videos || videos.length === 0) {
    return (
      <div>
        <LoadingSkeletonYoutube />
      </div>
    );
  }

  if (product?.category.id === 1) {
    return (
      <div className="w-full">
        {videos.map((video, i) => {
          const videoId = getVideoId(video);
          const title = getTitle(video);

          if (!videoId || !title) {
            return (
              <div key={i} className="text-red-500">
                Invalid video data
              </div>
            );
          }

          return (
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              className="rounded-xl lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px]"
              allowFullScreen
              loading="lazy"
            />
          );
        })}
      </div>
    );
  }

  if (product?.category.id === 2) {
    return (
      <div className="w-full">
        {videos.map((video, i) => {
          const videoId = getVideoId(video);
          const title = getTitle(video);

          if (!videoId || !title) {
            return (
              <div key={i} className="text-red-500">
                Invalid video data
              </div>
            );
          }

          return (
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              className="rounded-xl lg:h-[450px] md:h-[350px] h-[190px] w-full"
              allowFullScreen
              loading="lazy"
            />
          );
        })}
      </div>
    );
  }

  return null;
}
