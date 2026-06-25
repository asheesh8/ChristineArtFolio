import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/order-prints", label: "Prints" },
  { href: "/originals", label: "Originals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fbf8f1]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="font-serif text-xl tracking-tight text-stone-950">
          Christine Porter
        </Link>
        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-stone-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/order-prints"
          className="rounded-full border border-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-stone-950 hover:text-white"
        >
          Order
        </Link>
      </div>
    </header>
  );
}
