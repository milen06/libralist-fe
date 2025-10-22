"use client";

interface Props {
  genres: { id: number; name: string }[];
  languages: { code: string; name: string }[];
  search: string;
  setSearch: (v: string) => void;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLanguages: string[];
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
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
}: Props) {
  const toggleGenre = (name: string) => {
    setSelectedGenres((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(code)
        ? prev.filter((l) => l !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="Search books..."
        className="w-full border px-3 py-2 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4 className="font-bold mb-2">Genres</h4>
      <div className="space-y-1 mb-4">
        {genres.map((g) => (
          <label key={g.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(g.name)}
              onChange={() => toggleGenre(g.name)}
            />
            <span>{g.name}</span>
          </label>
        ))}
      </div>

      <h4 className="font-bold mb-2">Languages</h4>
      <div className="space-y-1">
        {languages.map((l) => (
          <label key={l.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedLanguages.includes(l.name)}
              onChange={() => toggleLanguage(l.name)}
            />
            <span>{l.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}