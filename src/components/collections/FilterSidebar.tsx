"use client";

import { Search } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface Language {
  code: string;
  name: string;
}

interface FilterSidebarProps {
  genres: Genre[];
  languages: Language[];
  search: string;
  setSearch: (value: string) => void;
  selectedGenres: string[];
  setSelectedGenres: (value: string[]) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (value: string[]) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

export default function FilterSidebar({
  genres,
  languages,
  search,
  setSearch,
  selectedGenres,
  setSelectedGenres,
  selectedLanguages,
  setSelectedLanguages,
  selectedYear,
  setSelectedYear,
}: FilterSidebarProps) {
  const handleGenreToggle = (genreName: string) => {
    setSelectedGenres(
      selectedGenres.includes(genreName)
        ? selectedGenres.filter((g) => g !== genreName)
        : [...selectedGenres, genreName]
    );
  };

  const handleLanguageToggle = (langCode: string) => {
    setSelectedLanguages(
      selectedLanguages.includes(langCode)
        ? selectedLanguages.filter((l) => l !== langCode)
        : [...selectedLanguages, langCode]
    );
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedYear("");
  };

  const hasActiveFilters =
    search ||
    selectedGenres.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedYear;

  return (
    <div className="sticky top-5">
      {/* Search */}
      <div className="mb-8">
        <h3 className="font-urbanistBold text-[20px] mb-4">Search</h3>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-textColor/50"
            size={20}
          />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-textColor/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor/50"
          />
        </div>
      </div>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full mb-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-urbanistSemibold"
        >
          Clear All Filters
        </button>
      )}

      {/* Genres */}
      <div className="mb-8">
        <h3 className="font-urbanistBold text-[20px] mb-4">Genres</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex items-center cursor-pointer hover:bg-mainColor/5 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre.name)}
                onChange={() => handleGenreToggle(genre.name)}
                className="w-4 h-4 text-mainColor border-textColor/30 rounded focus:ring-mainColor/50 cursor-pointer"
              />
              <span className="ml-3 font-urbanist">{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-8">
        <h3 className="font-urbanistBold text-[20px] mb-4">Languages</h3>
        <div className="space-y-2">
          {languages.map((lang) => (
            <label
              key={lang.code}
              className="flex items-center cursor-pointer hover:bg-mainColor/5 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang.code)}
                onChange={() => handleLanguageToggle(lang.code)}
                className="w-4 h-4 text-mainColor border-textColor/30 rounded focus:ring-mainColor/50 cursor-pointer"
              />
              <span className="ml-3 font-urbanist">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}