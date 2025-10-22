import { notFound } from "next/navigation";
import DetailBookClient from "../_components/DetailBookClient";
import { API_BASE_URL } from "@/lib/api";

interface Author {
  id: number;
  name: string;
  profile_photo: string;
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
  genres?: { id: number; name: string }[];
}

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${API_BASE_URL}/api/books/${params.slug}`, {
    // jangan cache agar fresh
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const data: { book: Book } = await res.json();
  const book = data.book;

  return <DetailBookClient book={book} />;
}