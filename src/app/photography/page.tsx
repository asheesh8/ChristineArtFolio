import { ArtworkCard } from "@/components/artwork-card";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { artworks } from "@/data/artworks";

export default function PhotographyPage() {
  const photography = artworks.filter((artwork) => artwork.medium === "Photography");

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Photography"
          title="Print-ready views of Vermont and nature"
          copy="A dedicated photography view for customers who want framed prints, paper prints, or canvas editions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {photography.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
