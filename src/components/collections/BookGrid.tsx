"use client";

import { API_BASE_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: { name: string };
  ratings_avg_rating: number;
  genres?: Genre[];
}

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  if (!books || books.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center">
        <Image
          src="/images/book-not-found.png"
          alt="No books found"
          width={400}
          height={400}
          className="mb-6 opacity-80"
        />
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "georgia, serif" }}
        >
          Book Not Found
        </h3>
        <p className="text-gray-500 max-w-md">
          We couldn&apos;t find any books that match your search or filters.  
          Try adjusting your filters or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/books/${book.slug}`}
          className="hover:-translate-y-2 duration-500"
        >
          {/* Cover */}
          <Image
            width={300}
            height={400}
            className="w-full rounded"
            src={`${API_BASE_URL}/${book.image}`}
            alt={book.title}
          />

          {/* Title */}
          <h5 className="font-urbanistSemibold text-[18px] mt-2.5 line-clamp-2">
            {book.title}
          </h5>

          {/* Author */}
          <p className="text-textColor/80 mt-1.5 mb-2.5 text-sm line-clamp-1">
            {book.author?.name}
          </p>

          {/* Rating */}
          <div className="flex mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`mr-1 ${
                  i < Math.round(Number(book.ratings_avg_rating))
                    ? "fill-mainColor text-mainColor"
                    : "text-mainColor stroke-[1.5]"
                }`}
              />
            ))}
          </div>

          {/* Genres */}
          {book.genres && book.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {book.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2.5 py-1 text-xs rounded-full bg-mainColor/10 text-mainColor font-urbanistSemibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}