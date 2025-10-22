// app/layout.tsx (atau src/app/layout.tsx) 
import type { Metadata } from "next";
import "./globals.css";
import Loader from "@/components/Loader";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Wishlist Book – Temukan Buku Favoritmu",
  description: "Platform untuk menemukan, menyimpan, dan membagikan buku favoritmu.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Wishlist Book",
    description: "Platform untuk menemukan, menyimpan, dan membagikan buku favoritmu.",
    url: "https://wishlist-book-fe.vercel.app",
    siteName: "Wishlist Book",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
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
