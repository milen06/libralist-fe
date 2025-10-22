"use client";

import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  Star,
  Bookmark,
  Share2,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
  Copy,
} from "lucide-react";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface Author {
  id: number;
  name: string;
  profile_photo: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_desc: string;
  synopsis: string;
  published_at: string;
  languages: string;
  ratings_avg_rating: number;
  author: Author;
  genres?: Genre[];
}

export default function DetailPage({ book }: { book: Book }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);

  const languages = JSON.parse(book.languages || "[]") as string[];
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/books/${book.slug}`;

  // Cek apakah buku sudah disimpan ketika halaman pertama kali load
  useEffect(() => {
    const fetchSavedStatus = async () => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await api.get("/api/wishlist-books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const savedBooks: Book[] = res.data.wishlist_books || [];
        const found = savedBooks.some((b) => b.id === book.id);
        setIsSaved(found);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchSavedStatus();
  }, [book.id]);

  useEffect(() => {
    const fetchAuthorBooks = async () => {
      try {
        const res = await api.get(`/api/authors/${book.author.id}`);
        const books: Book[] = res.data.author?.books || [];
        setAuthorBooks(books);
      } catch (error) {
        console.error("Failed to fetch author books:", error);
      }
    };
    fetchAuthorBooks();
  }, [book.author.id]);

  // Copy share link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
    }
  };

  // Simpan / Hapus buku dari wishlist
  const handleSave = async () => {
    const token = Cookies.get("token") || localStorage.getItem("token");
    if (!token) {
      toast.error("You must login first");
      return;
    }

    setLoadingSave(true);
    try {
      if (isSaved) {
        await api.delete(`/api/wishlist-books/${book.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsSaved(false);
        toast.success("Removed from your bookmarks");
      } else {
        await api.post(
          "/api/wishlist-books",
          { book_id: book.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsSaved(true);
        toast.success("Book saved to bookmarks");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || "Failed to save book");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <>
      <head>
        <title>{book.title} | Wishlist Book</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>

      <div className="flex">
        <Sidebar />
        <MobileNav />
        <main className="ml-auto container mx-5 sm:mx-auto relative z-10 mb-[100px]">
          <Navbar />

          {/* Hero */}
          <div className="flex md:flex-row flex-col justify-center items-center z-10 relative">
            <Image
              className="mr-[70px] lg:w-[250px] w-[300px]"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`}
              width={300}
              height={400}
              alt={book.title}
            />
            <div>
              <h1 className="font-[georgia] font-bold text-[32px] ">
                {book.title}
              </h1>

              {/* Rating & Save */}
              <div className="flex items-center mt-[5px] mb-5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const rating = book.ratings_avg_rating ?? 0;
                    return (
                      <Star
                        key={i}
                        className="mr-1 w-4 h-4 text-mainColor"
                        fill={i < Math.round(rating) ? "currentColor" : "none"}
                      />
                    );
                  })}
                  <span className="ml-1 mt-0.5">
                    ({(book.ratings_avg_rating ?? 0).toFixed(1)})
                  </span>
                </div>

                <span className="mx-5 w-[0.5px] h-6 bg-textColor/50" />

                {/* Bookmark button */}
                <button
                  onClick={handleSave}
                  disabled={loadingSave}
                  className={`p-3 rounded-full bg-textColor/10 hover:bg-textColor/20 transition ${
                    isSaved ? "text-mainColor" : "text-gray-500"
                  }`}
                  title={isSaved ? "Remove from Saved" : "Save this book"}
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className="w-[18px] h-[18px]"
                    fill={isSaved ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <p className="text-[20px] mb-[50px] ">{book.author.name}</p>

              {/* Share */}
              <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start">
                <div className="flex lg:order-2 order-1 xl:mr-0 mr-10 relative">
                  <button
                    type="button"
                    onClick={() => setIsShareOpen((v) => !v)}
                    className="p-2.5 cursor-pointer text-[20px] rounded-full bg-textColor/10 mx-6 focus:outline-none"
                    title="Share"
                    aria-haspopup="menu"
                    aria-expanded={isShareOpen}
                    aria-controls="share-menu"
                  >
                    <Share2 className="w-[18px] h-[18px]" />
                  </button>

                  {isShareOpen && (
                    <div
                      id="share-menu"
                      role="menu"
                      className="absolute z-20 right-0 mt-12 w-72 p-4 bg-white rounded-lg shadow-xl"
                    >
                      <p className="capitalize text-sm font-semibold mb-2">share</p>

                      <div className="flex items-center justify-start space-x-3 mb-3">
                        <Link
                          href={`https://wa.me/?text=${shareUrl}`}
                          target="_blank"
                          className="text-textColor hover:text-mainColor"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`https://www.instagram.com/?url=${shareUrl}`}
                          target="_blank"
                          className="text-textColor hover:text-mainColor"
                        >
                          <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                          target="_blank"
                          className="text-textColor hover:text-mainColor"
                        >
                          <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}
                          target="_blank"
                          className="text-textColor hover:text-mainColor"
                        >
                          <Facebook className="w-5 h-5" />
                        </Link>
                      </div>

                      <div className="flex items-center bg-gray-100/50 rounded px-3 py-2">
                        <span className="text-xs flex-1 truncate text-textColor">{shareUrl}</span>
                        <button
                          type="button"
                          onClick={copyLink}
                          className="ml-3 text-xs cursor-pointer font-medium text-mainColor hover:underline inline-flex items-center gap-1"
                          aria-live="polite"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full mt-[50px] h-[1px] bg-textColor/20 lg:block hidden" />
            </div>
          </div>

          {/* Description & details */}
          <div className="bg-lightMode rounded-lg lg:mt-0 mt-[50px] shadow-lg w-full px-[50px] pb-[50px] lg:pt-[200px] pt-[50px] relative lg:-top-[165px] top-0">
            <div className="grid grid-cols-12 gap-10">
              <div className="lg:col-span-7 col-span-12 lg:order-1 order-2 pr-20">
                <h4 className="font-semibold text-[20px] mb-3 ">Description</h4>
                <div
                  className="/80 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: book.synopsis }}
                />
              </div>

              <div className="flex flex-col justify-start gap-5 lg:col-span-5 col-span-12 lg:order-2 order-1">
                <div className="mb-4">
                  <h4 className="text-[20px]  font-semibold">Genre</h4>
                  <p className="/80 font-urbanist">
                    {book.genres?.map((g) => g.name).join(", ") || "-"}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-[20px]  font-semibold">Language</h4>
                  <p className="/80 font-urbanist">
                    {languages.join(", ") || "-"}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="text-[20px]  font-semibold">Written by</h4>
                  <p className="/80 font-urbanist">{book.author.name}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-[20px]  font-semibold">Published</h4>
                  <p className="/80 font-urbanist">
                    {new Date(book.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {/* <div className="mb-4">
                  <h4 className="text-[20px]  font-semibold">Total Read</h4>
                  <p className="/80 font-urbanist">60 times read</p>
                </div> */}
              </div>
            </div>
          </div>

         {/* Collection */}
          {authorBooks.length > 0 && (
            <div className="bg-lightMode rounded-lg relative lg:-top-20 lg:mt-0 mt-[50px] top-0 shadow-lg px-[50px] py-[30px]">
              <h4 className="font-semibold text-[20px] mb-[30px] ">
                Book Collection by {book.author.name}
              </h4>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-7">
                {authorBooks.map((b, index) => (
                  <Link
                    key={b.id}
                    href={`/books/${b.slug}`}
                    className={`flex group ${
                      b.id === book.id ? "bg-mainColor text-lightMode rounded-md" : ""
                    }`}
                  >
                    <span
                      className={`px-5 py-3 rounded-md font-semibold text-[16px] mr-[5px] ${
                        b.id === book.id
                          ? "bg-mainColor text-lightMode"
                          : "bg-readMode group-hover:bg-mainColor group-hover:text-lightMode transition"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <p
                      className={`px-5 py-3 rounded-md font-semibold text-[16px] w-full ${
                        b.id === book.id
                          ? "bg-mainColor text-lightMode"
                          : "bg-readMode group-hover:bg-mainColor group-hover:text-lightMode transition"
                      }`}
                    >
                      {b.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
