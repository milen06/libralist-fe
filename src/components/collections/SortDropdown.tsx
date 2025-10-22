"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  // { label: "Most Popular", value: "popular" },
  { label: "Most Rated", value: "rated" },
];

export default function SortDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const currentLabel =
    sortOptions.find((opt) => opt.value === value)?.label ?? "Latest";

  return (
    <div className="relative w-[170px] h-2/4 mt-5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#e45f65]"
        style={{ fontSize: "14px" }}
      >
        <span className="block ml-3 truncate">{currentLabel}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5"
            style={{ fill: "#9ca3af" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-56 focus:outline-none">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`relative py-2 pl-3 pr-9 cursor-pointer select-none ${
                value === option.value
                  ? "bg-[#e45f65] text-white"
                  : "text-[#111827] hover:bg-[#e45f65] hover:text-white"
              }`}
              style={{ fontSize: "14px" }}
            >
              {option.label}
              {value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="w-5 h-5"
                    style={{ fill: "white" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}