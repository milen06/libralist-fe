import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-[50px] bg-lightMode border-t border-textColor/30 md:pb-[50px] pb-32">
      <div className="flex items-center xs:justify-between justify-center mx-[115px]">
        <Image
          width={120}
          height={40}
          id="logo-footer-img"
          className="xs:mr-0 mr-5"
          src="/images/libralist-logo.jpg"
          alt="Logo Novex"
        />
        
        <div className="md:flex hidden">
          <Link
            href="/"
            className="mr-[50px] duration-300 hover:text-mainColor"
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="mr-[50px] duration-300 hover:text-mainColor"
          >
            Collections
          </Link>
          <Link
            href="/bookmarks"
            className="mr-[50px] duration-300 hover:text-mainColor"
          >
            Bookmarks
          </Link>
        </div>
        
        <div className="flex">
          <a
            href="https://twitter.com"
            className="duration-300 hover:-translate-y-1 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter text-[20px] mr-4 group-hover:text-mainColor duration-300"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="duration-300 hover:-translate-y-1 group"
          >
            <i className="fab fa-facebook text-[20px] mr-4 group-hover:text-mainColor duration-300"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="duration-300 hover:-translate-y-1 group"
          >
            <i className="fab fa-instagram text-[20px] mr-4 group-hover:text-mainColor duration-300"></i>
          </a>
        </div>
      </div>
      
      <div className="flex md:flex-row flex-col items-center justify-between mx-[115px] mt-10">
        <p className="md:mt-0 mt-5 md:order-1 order-3 whitespace-nowrap">
          Copyright © {currentYear} Novex. All Right Reserved.
        </p>
        <div className="order-2 md:flex hidden w-full bg-textColor/50 h-[1px] mx-5"></div>
        <div className="flex md:order-3 order-1">
          <Link
            href="#"
            className="duration-300 hover:text-mainColor mr-6"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="duration-300 hover:text-mainColor mr-6"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="duration-300 hover:text-mainColor"
          >
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}