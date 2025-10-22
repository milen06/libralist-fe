"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Loader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 700);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (hidden) return null;

  return (
    <div className="loader fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-lightMode z-[999] transition-opacity duration-700">
      <Image width={150} height={150} src="/images/libralist-logo.jpg" alt="Loader Light" />
    </div>
  );
}