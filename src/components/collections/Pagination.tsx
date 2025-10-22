"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalBooks: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalBooks,
  onPageChange,
}: PaginationProps) {
  const maxPageButtons = 5; // jumlah tombol angka yang ditampilkan di tengah

  const goToPrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
    // scrollToTop();
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
    // scrollToTop();
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
      // scrollToTop();
    }
  };

  // const scrollToTop = () => {
  //   if (typeof window !== "undefined") {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // };

  // Tentukan rentang halaman yang ditampilkan
  const getPageNumbers = () => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxPageButtons - 1);

    if (end - start < maxPageButtons - 1) {
      start = Math.max(1, end - maxPageButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-[50px] gap-4">
      {/* Info text */}
      <p className="text-sm" style={{ fontFamily: "var(--font-urbanist)" }}>
        Showing{" "}
        <span style={{ fontFamily: "var(--font-urbanist-bold)", color: "#e45f65" }}>
          {startIndex} - {endIndex}
        </span>{" "}
        of{" "}
        <span style={{ fontFamily: "var(--font-urbanist-bold)", color: "#e45f65" }}>
          {totalBooks}
        </span>{" "}
        books
      </p>

      {/* Numbered Pagination */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Previous page"
        >
          <ChevronLeft
            className={`w-4 h-4 ${
              currentPage === 1 ? "text-gray-400" : "text-gray-700"
            }`}
          />
        </button>

        {/* First page + ellipsis */}
        {pageNumbers[0] > 1 && (
          <>
            <PageButton page={1} currentPage={currentPage} onClick={handlePageClick} />
            {pageNumbers[0] > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {/* Page numbers */}
        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            page={page}
            currentPage={currentPage}
            onClick={handlePageClick}
          />
        ))}

        {/* Last page + ellipsis */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <PageButton
              page={totalPages}
              currentPage={currentPage}
              onClick={handlePageClick}
            />
          </>
        )}

        {/* Next */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Next page"
        >
          <ChevronRight
            className={`w-4 h-4 ${
              currentPage === totalPages ? "text-gray-400" : "text-gray-700"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

// Komponen tombol page angka
function PageButton({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) {
  const isActive = page === currentPage;
  return (
    <button
      onClick={() => onClick(page)}
      className={`px-3 py-1 text-sm rounded-md border transition ${
        isActive
          ? "bg-mainColor text-white border-mainColor"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {page}
    </button>
  );
}