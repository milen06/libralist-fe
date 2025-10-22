// app/layout.tsx (atau src/app/layout.tsx)
import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/Loader";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "LibraList - Wishlist Book",
  description: "Platform untuk menemukan, menyimpan, dan membagikan buku favoritmu.",
  icons: {
    icon: "/images/libralist-logo.jpg",
    shortcut: "/images/libralist-logo.jpg",
    apple: "/images/libralist-logo.jpg",
  },
  openGraph: {
    title: "LibraList - Wishlist Book",
    description: "Platform untuk menemukan, menyimpan, dan membagikan buku favoritmu.",
    url: "https://libralist-app.vercel.app",
    siteName: "LibraList - Wishlist Book",
    images: [{ url: "/images/libralist-logo.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Loader />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
