import { ArtworkCard } from "@/components/artwork-card";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { availableOriginals } from "@/data/artworks";

export default function OriginalsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Originals"
          title="Available originals and inquiry pieces"
          copy="Each listing is structured for original availability, dimensions, price notes, print requests, and framing questions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableOriginals.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
