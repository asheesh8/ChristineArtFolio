import Image from "next/image";
import Link from "next/link";
import { artworks, getArtworkSku } from "@/data/artworks";
import { businessInfo } from "@/data/businessInfo";
import { SectionHeading } from "@/components/section-heading";

const showcaseWorks = [
  ...artworks.filter((artwork) =>
    [
      "Lake Champlain Mountain View",
      "Alpacas in Doorway",
      "Rooster Reborn",
      "Sunrise near Mt. Mansfield",
      "Autumn Forest near Stowe",
    ].includes(artwork.title),
  ),
  ...artworks.slice(0, 8),
].slice(0, 6);

export function FacebookShowcase() {
  return (
    <section className="border-y border-stone-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow="Facebook"
              title="Christine Porter Photography"
              copy="Follow Christine's Facebook page for recent artwork, photography updates, studio notes, and pieces as they become available."
            />
            <Link
              href={businessInfo.facebook}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8 inline-flex"
            >
              Visit Facebook Page
            </Link>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-[#fbf8f1] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 px-2 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877f2] text-xl font-bold text-white">
                  f
                </div>
                <div>
                  <p className="font-semibold text-stone-950">
                    Christine Porter Photography
                  </p>
                  <p className="text-sm text-stone-500">
                    Artwork, Vermont photography, and studio updates
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
                Recent work
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {showcaseWorks.map((artwork) => (
                <Link
                  key={`${artwork.id}-${getArtworkSku(artwork)}`}
                  href={`/order-prints?sku=${encodeURIComponent(getArtworkSku(artwork))}`}
                  className="group overflow-hidden rounded-[1.25rem] bg-white shadow-sm"
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="truncate font-serif text-2xl text-stone-950">
                      {artwork.title}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                      {artwork.medium}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] bg-white p-4">
              <p className="text-sm leading-6 text-stone-600">
                See more of Christine&apos;s photography and artwork on Facebook,
                then request a print or ask about an original here.
              </p>
              <Link
                href={businessInfo.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-stone-950 underline underline-offset-4"
              >
                Open Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
