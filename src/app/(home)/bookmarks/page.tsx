"use client";

import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookSwiper from "@/components/bookmarks/BookSwiper";
import { api } from "@/lib/axios";
import Cookies from "js-cookie";

interface Genre {
  id: number;
  name: string;
}

interface Book {
  id: number;
  slug: string;
  title: string;
  image: string;
  ratings_avg_rating?: number;
  author: { name: string };
  genres?: Genre[];
}

export default function BookmarksPage() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);

  const savedPrevRef = useRef<HTMLButtonElement | null>(null);
  const savedNextRef = useRef<HTMLButtonElement | null>(null);
  const recPrevRef = useRef<HTMLButtonElement | null>(null);
  const recNextRef = useRef<HTMLButtonElement | null>(null);

  // Fetch Wishlist (Saved Books)
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = Cookies.get("token") || localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/api/wishlist-books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedBooks(res.data.wishlist_books);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      } finally {
        setLoadingSaved(false);
      }
    };

    fetchWishlist();
  }, []);

  // Fetch Recommended Books
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get("/api/books/recommended");
        setRecommendedBooks(res.data.recommended_books || []);
      } catch (err) {
        console.error("Failed to fetch recommended books:", err);
      } finally {
        setLoadingRecs(false);
      }
    };

    fetchRecommended();
  }, []);

  const formattedSavedBooks = savedBooks.map((book) => ({
    href: `/books/${book.slug}`,
    img: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`,
    title: book.title,
    author: book.author?.name ?? "-",
    rating: Math.round(book.ratings_avg_rating ?? 0),
    genres: book.genres ?? [],
  }));

  const formattedRecommendedBooks = recommendedBooks.map((book) => ({
    href: `/books/${book.slug}`,
    img: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`,
    title: book.title,
    author: book.author?.name ?? "-",
    rating: Math.round(book.ratings_avg_rating ?? 0),
    genres: book.genres ?? [],
  }));

  return (
    <>
      <div className="flex">
        <Sidebar />
        <MobileNav />

        <main className="ml-auto container mx-5 sm:mx-auto relative z-10 mb-[100px]">
          <Navbar />

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-[georgia] font-bold sm:text-[50px] text-[32px]">
              Keep the story going...
            </h1>
            <p className="mt-[30px] mb-[50px] text-textColor/80">
              Don’t let the story end just yet. Continue exploring the world of literature.
            </p>
          </div>

          <div className="w-full h-[1px] bg-textColor/50 mb-[50px]" />

          {/* Book Saved */}
          <div className="mb-10">
            <div className="flex justify-between mb-10">
              <h2 className="font-[georgia] font-bold text-[28px]">
                Book Saved
              </h2>
              <div className="flex items-center gap-2">
                <button
                  ref={savedPrevRef}
                  className="p-1 rounded hover:bg-mainColor/10"
                  aria-label="Prev saved books"
                >
                  <ChevronLeft className="text-mainColor w-5 h-5" />
                </button>
                <button
                  ref={savedNextRef}
                  className="p-1 rounded hover:bg-mainColor/10"
                  aria-label="Next saved books"
                >
                  <ChevronRight className="text-mainColor w-5 h-5" />
                </button>
              </div>
            </div>

            {loadingSaved ? (
              <p className="text-center text-gray-500">Loading your saved books...</p>
            ) : formattedSavedBooks.length === 0 ? (
              <p className="text-center text-gray-500">No saved books yet.</p>
            ) : (
              <BookSwiper
                books={formattedSavedBooks}
                prevRef={savedPrevRef}
                nextRef={savedNextRef}
                swiperClass="book-saved-swiper"
              />
            )}
          </div>

          {/* Other Recommended Books */}
          <div>
            <div className="flex justify-between mb-10">
              <h2 className="font-[georgia] font-bold text-[28px]">
                Other Recommended Books
              </h2>
              <div className="flex items-center gap-2">
                <button
                  ref={recPrevRef}
                  className="p-1 rounded hover:bg-mainColor/10"
                  aria-label="Prev recommended books"
                >
                  <ChevronLeft className="text-mainColor w-5 h-5" />
                </button>
                <button
                  ref={recNextRef}
                  className="p-1 rounded hover:bg-mainColor/10"
                  aria-label="Next recommended books"
                >
                  <ChevronRight className="text-mainColor w-5 h-5" />
                </button>
              </div>
            </div>

            {loadingRecs ? (
              <p className="text-center text-gray-500">Loading recommended books...</p>
            ) : formattedRecommendedBooks.length === 0 ? (
              <p className="text-center text-gray-500">No recommendations available.</p>
            ) : (
              <BookSwiper
                books={formattedRecommendedBooks}
                prevRef={recPrevRef}
                nextRef={recNextRef}
                swiperClass="recommended-books-swiper"
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}