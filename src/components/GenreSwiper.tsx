"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Swiper from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Genre {
  id: number;
  name: string;
  image: string;
}

export default function GenreSwiper({ genres }: { genres: Genre[] }) {
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Swiper) {
      const SwiperClass = window.Swiper;

      swiperRef.current = new SwiperClass(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        },
      });
    }

    return () => {
      swiperRef.current?.destroy();
    };
  }, []);

  return (
    <section>
      <h1 className="font-[georgia] font-bold text-[32px]">
        Find Your Favorite Genres
      </h1>

      <div className="swiper mySwiper">
        <div className="swiper-wrapper pb-[50px] pt-10">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="swiper-slide hover:-translate-y-2 duration-500"
            >
              <Link href={`/collections?genres=${genre.name}`} className="block">
                  {genre.image && (
                    <Image
                      width={200}
                      height={500}
                      className="rounded w-full max-h-[250px] object-cover"
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${genre.image}`}
                      alt={genre.name}
                    />
                  )}

                  <h5 className="font-urbanistSemibold text-[18px] mt-2.5 text-center">
                    {genre.name}
                  </h5>
                </Link>

            </div>
          ))}
        </div>
      </div>

      <button className="custom-swiper-button-prev" aria-label="Previous">
        <ChevronLeft className="text-mainColor" />
      </button>
      <button className="custom-swiper-button-next" aria-label="Next">
        <ChevronRight className="text-mainColor" />
      </button>
    </section>
  );
}