/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
      "i.scdn.co",
      "res.cloudinary.com",
      "cdn.example.com",
      "image.yes24.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "i.namu.wiki",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
