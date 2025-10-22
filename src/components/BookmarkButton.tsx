"use client";

import { useState } from "react";

export function BookmarkButton() {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(!active)}
      className={`btn-bookmark p-2 rounded-full ${active ? "bg-mainColor/10 text-mainColor" : ""}`}
    >
      <i className="fa-regular fa-bookmark"></i>
    </button>
  );
}