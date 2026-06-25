import { ArtworkCard } from "@/components/artwork-card";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { artworks } from "@/data/artworks";

export default function GalleryPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="All works"
          copy="A cleaner catalog view for Christine's photography, paintings, watercolors, pastels, and print-ready scenes."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
