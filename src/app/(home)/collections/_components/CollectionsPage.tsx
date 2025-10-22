"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/collections/FilterSidebar";
import BookGrid from "@/components/collections/BookGrid";
import SortDropdown from "@/components/collections/SortDropdown";
import Pagination from "@/components/collections/Pagination";
import { api } from "@/lib/axios";

interface Book {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: { name: string };
  ratings_avg_rating: number;
}

interface Genre {
  id: number;
  name: string;
}

const STATIC_LANGUAGES = [
  { code: "id", name: "Indonesian" },
  { code: "en", name: "English" },
  { code: "zh", name: "Chinese" },
  { code: "ko", name: "Korean" },
  { code: "ja", name: "Japanese" },
];

export default function CollectionsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🧭 Ambil initial value dari URL
  const initialSearch = searchParams.get("search") ?? "";
  const initialGenres = searchParams.get("genres")?.split(",") ?? [];
  const initialAuthors = searchParams.get("authors")?.split(",") ?? [];
  const initialLanguages = searchParams.get("languages")?.split(",") ?? [];
  const initialSort = searchParams.get("sort") ?? "";
  const initialPage = Number(searchParams.get("page") ?? 1);

  // 🧠 State
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(initialAuthors);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialLanguages);
  const [sort, setSort] = useState<string>(initialSort);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 12;

  // Update URL setiap kali filter berubah
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedGenres.length > 0) params.set("genres", selectedGenres.join(","));
    if (selectedAuthors.length > 0) params.set("authors", selectedAuthors.join(","));
    if (selectedLanguages.length > 0) params.set("languages", selectedLanguages.join(","));
    if (sort) params.set("sort", sort);
    if (currentPage > 1) params.set("page", currentPage.toString());

    router.replace(`${pathname}?${params.toString()}`);
  }, [search, selectedGenres, selectedAuthors, selectedLanguages, sort, currentPage, pathname, router]);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/api/genres");
        setGenres(res.data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch books setiap filter berubah
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        selectedGenres.forEach((g) => params.append("genres[]", g));
        selectedAuthors.forEach((a) => params.append("authors[]", a));
        selectedLanguages.forEach((l) => params.append("languages[]", l));
        if (sort) params.append("sort", sort);
        params.append("page", currentPage.toString());
        params.append("perPage", perPage.toString());

        const res = await api.get(`/api/books?${params.toString()}`);
        const payload = res.data.books;

        setBooks(payload.data || []);
        setTotalBooks(payload.total ?? 0);
        setTotalPages(payload.last_page ?? 1);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, [search, selectedGenres, selectedAuthors, selectedLanguages, sort, currentPage]);

  const startIndex = (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalBooks);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <MobileNav />

        <main className="container mx-5 sm:mx-auto relative z-10 mb-[100px]">
          <Navbar />

          <div className="grid grid-cols-12 gap-12">
            {/* 🧭 Sidebar Filter */}
            <div className="xl:col-span-3 lg:col-span-5 col-span-12">
              <FilterSidebar
                genres={genres}
                languages={STATIC_LANGUAGES}
                search={search}
                setSearch={setSearch}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
              />
            </div>

            {/* 📚 Main Content */}
            <div className="xl:col-span-9 lg:col-span-7 col-span-12">
              <div className="flex justify-between items-center mb-4">
                <h2
                  className="font-bold text-[24px]"
                  style={{ fontFamily: "georgia, serif" }}
                >
                  Book Collections
                </h2>
                <SortDropdown value={sort} onChange={setSort} />
              </div>

              {/* Info */}
              <p
                className="mt-5 mb-2.5"
                style={{ fontFamily: "var(--font-urbanist)" }}
              >
                Showing {startIndex} – {endIndex} books out of {totalBooks} for{" "}
                <span
                  style={{
                    fontFamily: "var(--font-urbanist-bold)",
                    color: "#e45f65",
                  }}
                >
                  {search ||
                  selectedGenres.length > 0 ||
                  selectedLanguages.length > 0
                    ? "Your filters"
                    : "All Books"}
                </span>
              </p>

              {/* Grid */}
              <BookGrid books={books} />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                totalBooks={totalBooks}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}