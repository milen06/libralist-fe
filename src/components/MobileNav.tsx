"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BookOpen, Bookmark } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function MobileNav() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/",            label: "Home",        Icon: Home },
    { href: "/collections", label: "Collections", Icon: BookOpen },
    { href: "/bookmarks",   label: "Bookmarks",   Icon: Bookmark },
  ];

  return (
    <nav
      className="md:hidden z-[999] flex fixed bottom-0 inset-x-0 border-t border-mainColor/50 bg-lightMode justify-between text-sm text-textColor pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile"
    >
      {navItems.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={[
              "group w-full font-urbanistSemibold block py-4 px-3 text-center transition duration-300",
              active
                ? "bg-mainColor/10 text-mainColor"
                : "hover:bg-mainColor/10 hover:text-mainColor",
            ].join(" ")}
          >
            <div className="mx-auto mb-1 flex items-center justify-center">
              <Icon
                className={[
                  "w-5 h-5 transition-colors duration-300",
                  active ? "text-mainColor" : "text-textColor group-hover:text-mainColor",
                ].join(" ")}
                aria-hidden="true"
              />
            </div>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
