export const metadata = {
  title: "Pickly",
  description:
    "Pickly is a next-generation product discovery platform where quality meets curation. Whether you’re searching for the latest gadgets, everyday essentials, or hidden gems, Pickly connects you with handpicked items trusted by real users.",
  icons: {
    icon: "/icons/favicon.png",
  },
  openGraph: {
    title: "Pickly",
    description:
      "Discover and compare curated products trusted by real users. Experience the next generation of product discovery.",
    siteName: "Pickly",
    url: "https://pickly.vercel.app",
    type: "website",
    images: [
      {
        url: "https://pickly.vercel.app/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Pickly image",
      },
    ],
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
