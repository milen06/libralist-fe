"use client";

import { useEffect, useRef, useState } from "react";

export default function Popover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="btn-popover px-4 py-2 bg-mainColor text-lightMode rounded">
        Filter
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 bg-lightMode dark:bg-textColor w-48 rounded shadow-lg">
          <li className="px-4 py-2 hover:bg-mainColor/10 cursor-pointer">Option 1</li>
          <li className="px-4 py-2 hover:bg-mainColor/10 cursor-pointer">Option 2</li>
        </ul>
      )}
    </div>
  );
}