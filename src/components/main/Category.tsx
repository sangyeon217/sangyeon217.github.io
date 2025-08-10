"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { CategoryItem } from "@/lib/contentful";

type Props = { categories: CategoryItem[] };

export default function Category({ categories }: Props) {
  const searchParams = useSearchParams();
  const current = searchParams.get("category") || "All";

  return (
    <nav className="mb-4 flex flex-wrap gap-2">
      {categories.map((category) => {
        const selected = category.name === current;
        const href =
          category.name === "All" ? "/" : `/?category=${encodeURIComponent(category.name)}`;
        return (
          <Link
            key={category.name}
            href={href}
            className={[
              "group flex items-center gap-1 px-3 py-1 rounded-full border text-sm transition-colors",
              selected
                ? "bg-black text-white border-black"
                : "bg-white text-black border-neutral-300 hover:border-black",
            ].join(" ")}
            aria-current={selected ? "page" : undefined}
            prefetch={false}
          >
            <span>{category.name}</span>
            <span
              className={[
                "text-xs px-1.5 rounded-full transition-colors",
                selected
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200",
              ].join(" ")}
            >
              {category.count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
