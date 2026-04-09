"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors duration-300 ${path === href ? "bg-white/10 text-white" : "hover:text-white"}`}
    >
      {children}
    </Link>
  );
}
