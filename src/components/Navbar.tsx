"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Handle search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/collections?search=${encodeURIComponent(query)}`);
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <nav id="navbar" className="flex justify-between items-center py-4">
      {/* 🔍 Search Box */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex-1 max-w-[500px] mr-5"
      >
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search book by title, author, or genre..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-1 focus:ring-mainColor focus:border-mainColor text-sm"
        />
      </form>

      {/* 👤 User Section */}
      <div className="relative cursor-pointer">
        {user ? (
          // ✅ Jika user login
          <div>
            <div
              className="flex items-center space-x-2"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={`https://robohash.org/${user.username}?set=set4&bgset=&size=400x400`}
                alt="Profile"
              />
              <p className="md:block hidden font-semibold">
                {user.name || "User"}
              </p>
            </div>

            {showProfileMenu && (
              <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 text-sm z-50">
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          // 🚪 Jika belum login
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-mainColor text-white rounded-md text-sm font-medium hover:bg-opacity-90 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
