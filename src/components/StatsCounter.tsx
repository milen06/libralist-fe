"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import Counter from "./Counter";

export default function StatsCounter() {
  const [visitors, setVisitors] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    // Hit visitor counter API (increment once per user per day)
    fetch(`${API_BASE_URL}/api/visitors/count`, { method: "POST" });

    // Fetch visitor total
    fetch(`${API_BASE_URL}/api/visitors/total`)
      .then((res) => res.json())
      .then((data) => setVisitors(data.total_visitors));

    // Fetch book count
    fetch(`${API_BASE_URL}/api/books?perPage=1`)
      .then((res) => res.json())
      .then((data) => setBookCount(data.books.total ?? data.books?.length ?? 0));

    // Fetch review count
    fetch(`${API_BASE_URL}/api/total-reviews`)
      .then((res) => res.json())
      .then((data) => setReviewCount(data.total_reviews));

    }, []);

  return (
    <div className="lg:flex grid rounded-md xs:grid-cols-2 grid-cols-1 justify-around items-center py-7 mb-[50px] lg:bg-[#F0EEE2]/40 mt-10">
      <Counter end={bookCount} label="Book Collections" />
      <Counter end={reviewCount} label="Reviews" />
      <Counter end={visitors} label="Total Visits" />
    </div>
  );
}