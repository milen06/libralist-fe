"use client";

import "swiper/css";
import "swiper/css/navigation";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type SwiperCore from "swiper";

declare global {
  interface Window {
    Swiper: typeof SwiperCore;
  }
}

interface Genre {
  id: number;
  name: string;
}

interface Book {
  href: string;
  img: string;
  title: string;
  author: string;
  rating: number;
  genres?: Genre[];
}

interface BookSwiperProps {
  books: Book[];
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  swiperClass: string;
}

// ⭐ Komponen bintang rating
function Stars({ value }: { value: number }) {
  return (
    <div className="flex mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={`mr-1 ${
            i < Math.round(value)
              ? "fill-mainColor text-mainColor"
              : "text-mainColor stroke-[1.5]"
          }`}
        />
      ))}
    </div>
  );
}

export default function BookSwiper({
  books,
  prevRef,
  nextRef,
  swiperClass,
}: BookSwiperProps) {
  const swiperInstanceRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Swiper) {
      const Swiper = window.Swiper;
      swiperInstanceRef.current = new Swiper(`.${swiperClass}`, {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        },
        breakpoints: {
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        },
      });
    }

    return () => {
      swiperInstanceRef.current?.destroy();
    };
  }, [prevRef, nextRef, swiperClass]);

  return (
    <div className={`swiper ${swiperClass}`}>
      <div className="swiper-wrapper pb-[50px]">
        {books.map((book) => (
          <div
            key={book.href}
            className="swiper-slide hover:-translate-y-2 duration-500"
          >
            <Link href={book.href} className="block">
              {/* Cover */}
              <Image
                width={200}
                height={250}
                className="w-full rounded"
                src={book.img}
                alt={book.title}
              />

              {/* Title */}
              <h5 className="font-urbanistSemibold text-[18px] mt-2.5 line-clamp-2">
                {book.title}
              </h5>

              {/* Author */}
              <p className="text-textColor/80 mt-1.5 mb-2.5 text-sm line-clamp-1">
                {book.author}
              </p>

              {/* Rating */}
              <Stars value={book.rating} />

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
          </div>
        ))}
      </div>
    </div>
  );
}