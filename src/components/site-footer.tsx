import Link from "next/link";
import { businessInfo } from "@/data/businessInfo";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl">{businessInfo.brandName}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">
            {businessInfo.tagline}
          </p>
        </div>
        <div className="text-sm leading-7 text-stone-300">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Visit
          </p>
          <p className="mt-3">{businessInfo.location}</p>
          <p>{businessInfo.address}</p>
        </div>
        <div className="text-sm leading-7 text-stone-300">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Studio
          </p>
          <Link href="/contact" className="mt-3 block hover:text-white">
            Contact Christine
          </Link>
          <Link href="/admin" className="block hover:text-white">
            Admin placeholder
          </Link>
        </div>
      </div>
    </footer>
  );
}
