import Image from "next/image";
import Link from "next/link";
import { getArtworkSku, type Artwork } from "@/data/artworks";

type ArtworkCardProps = {
  artwork: Artwork;
  priority?: boolean;
};

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  const sku = getArtworkSku(artwork);

  return (
    <article className="group overflow-hidden rounded-xl border border-stone-200/80 bg-white/82 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#fbf8f1]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-800">
          {artwork.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-stone-950">{artwork.title}</h3>
            <p className="mt-1 text-sm text-stone-500">{artwork.medium}</p>
          </div>
          <span className="rounded-full border border-stone-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
            {artwork.originalStatus}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-stone-600">{artwork.description}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            href={`/order-prints?sku=${encodeURIComponent(sku)}`}
            className="text-stone-950 underline underline-offset-4"
          >
            Request Print
          </Link>
          <Link href="/contact" className="text-stone-500 hover:text-stone-950">
            Inquire About Original
          </Link>
        </div>
      </div>
    </article>
  );
}
