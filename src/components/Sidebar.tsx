"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Home, BookOpen, Bookmark } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  className?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/",           label: "Home",       Icon: Home },
    { href: "/collections", label: "Collections", Icon: BookOpen, className: "collections" },
    { href: "/bookmarks",   label: "Bookmarks",   Icon: Bookmark, className: "bookmarks" },
  ];

  return (
    <aside id="sidebar" className="md:block hidden">
      <Link href="/" className="logo">
        <Image
          width={1000}
          height={1000}
          id="logo-img"
          src="/images/libralist-logo.jpg"
          alt="Logo Novex"
          className="w-full px-4"
          priority
        />
      </Link>

      <div className="sidebar-navigation">
        {navItems.map(({ href, label, className, Icon }) => {
          const active = pathname === href;
          return (
            <div key={href} className="relative flex flex-col items-center group">
              <Link
                href={href}
                className={`nav-icon ${className || ""} ${active ? "active" : ""}`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </Link>
              <div className="absolute top-2 -right-20 hidden group-hover:flex flex-col items-center mb-5">
                <span className="relative rounded-md z-10 px-3 py-4 text-xs leading-none text-white whitespace-nowrap bg-textColor shadow-lg">
                  {label}
                </span>
                <div className="w-3 h-3 absolute -left-1 top-6 -mt-2 rotate-45 bg-textColor"></div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}