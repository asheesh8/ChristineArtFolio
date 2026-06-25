import { ArtworkCard } from "@/components/artwork-card";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { artworks } from "@/data/artworks";

export default function FineArtPage() {
  const fineArt = artworks.filter((artwork) => artwork.medium !== "Photography");

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Fine art"
          title="Pastel, watercolor, oil, and original work"
          copy="A quieter original-art room for pieces that may be available, sold, or ready for direct inquiry."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fineArt.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
