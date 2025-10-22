"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("light"); // Always light mode
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force light mode
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  }, []);

  // Empty toggle function (does nothing)
  const toggleTheme = () => {
    console.log('🔒 Dark mode is disabled. Only light mode is available.');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}