import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import GenreSwiper from "@/components/GenreSwiper";
import StatsCounter from "@/components/StatsCounter";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import { api } from "@/lib/axios";

export const dynamic = "force-static";

interface Book {
  id: number;
  title: string;
  slug: string;
  author: { name: string };
  image: string;
  ratings_avg_rating: number;
  genres: Genre[];
}

interface Author {
  id: number;
  name: string;
  profile_photo: string;
  books: Book[];
}

interface Genre {
  id: number;
  name: string;
  image: string;
}

export default async function HomePage() {
  const [booksRes, authorsRes, genresRes] = await Promise.all([
    api.get<{ books: Book[] }>("/api/books"),
    api.get<{ authors: { data: Author[] } }>("/api/authors"),
    api.get<{ genres: Genre[] }>("/api/genres"),
  ]);

  const books = booksRes.data.books;
  const authors = authorsRes.data.authors.data;
  const genres = genresRes.data.genres;
  const popularBooks = books.slice(0, 8);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <MobileNav />

        <main className="container mx-5 sm:mx-auto relative z-10">
          <Navbar />

          {/* Hero Section */}
          <header className="grid lg:grid-cols-2 grid-cols-1 lg:gap-10 lg:mt-0 mt-10">
            <div className="flex flex-col justify-center">
              <h1 className="xl:text-[56px] text-[45px] font-[georgia] font-bold">
                A Book Can
              </h1>
              <h1 className="xl:text-[56px] text-[45px] font-[georgia] font-bold">
                Change Your Life
              </h1>
              <p className="my-[30px]">
                Novex is an online platform that provides easy and convenient
                access to read novels. With a diverse and continuously updated
                collection of novels, Novex allows users to enjoy various genres
                and engaging stories at their fingertips.
              </p>
              <Link href="/collections" className="btn text-center">
                Explore Now
              </Link>
            </div>
            <div className="right-side lg:block hidden">
              <Image
                width={600}
                height={600}
                src="/images/header-home.png"
                className="w-full"
                alt="Header"
                priority
              />
            </div>
          </header>

          {/* Visitor Counter & Stats */}
          <StatsCounter />

          {/* Genre Swiper */}
          <GenreSwiper genres={genres} />

          {/* Popular Books */}
          <section>
            <h1 className="font-[georgia] font-bold text-[32px] mb-10">
              Popular Now
            </h1>
            <div className="grid lg:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-10">
              {popularBooks.map((book) => (
                <Link
                  key={book.id}
                  className="hover:-translate-y-2 duration-500"
                  href={`/books/${book.slug}`}
                >
                  <Image
                    width={300}
                    height={400}
                    className="w-full rounded"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book.image}`}
                    alt={book.title}
                  />
                  <h5 className="font-urbanistSemibold text-[18px] mt-2.5">
                    {book.title}
                  </h5>
                  <p className="text-textColor/80 mt-1.5 mb-2.5">
                    {book.author?.name}
                  </p>
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
                  
                  {book.genres && book.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {book.genres.map((genre: { id: number; name: string }) => (
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
            <div className="flex justify-center">
              <Link
                href="/collections"
                className="text-center btn bg-textColor text-lightMode focus:ring-textColor/50 mt-16"
              >
                Show All
              </Link>
            </div>
          </section>

          {/* Authors */}
          <section>
            <h1 className="font-[georgia] font-bold text-[32px] mb-10">
              New Author Collection
            </h1>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="flex 2xs:flex-row flex-col 2xs:items-center items-start duration-300 hover:brightness-90"
                >
                  <Image
                    width={150}
                    height={150}
                    className="mr-5 rounded-full aspect-square object-cover 2xs:w-[150px] w-full 2xl:mb-0 mb-2"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${author.profile_photo}`}
                    alt={author.name}
                  />
                  <div>
                    <h5 className="font-urbanistSemibold text-[20px]">
                      {author.name}
                    </h5>
                    <p className="text-textColor/80 mt-3 mb-5">
                      {author.books.length ?? 0} books have been published
                    </p>
                    <Link
                      href={`/collections?authors=${author.name}`}
                      className="text-center text-[12px] btn bg-textColor text-lightMode focus:ring-textColor/50 mt-16"
                    >
                      Read Book Series
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
