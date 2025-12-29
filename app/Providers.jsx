"use client";
import { usePathname } from "next/navigation";
import SmoothScroll from "./Components/UI/SmoothScroll";

export default function Providers({ children }) {
  const pathname = usePathname();

  // Disable smooth scroll on blog pages where sticky sidebar is needed
  const disableSmooth =
    pathname === "/app-icon-design-blog" ||
    pathname === "/publish-app-on-play-store" ||
    pathname === "/best-instagram-management-tools" ||
    pathname.startsWith("/blogs") || 
    pathname.includes("app-icon-design") ||
    pathname.includes("-blog") ||
    pathname.includes("blog") ||
    pathname.includes("play-store") ||
    pathname.includes("instagram"); // catch all blog routes

  if (disableSmooth) return children;

  return <SmoothScroll>{children}</SmoothScroll>;
}
