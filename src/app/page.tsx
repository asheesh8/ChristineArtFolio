import Link from "next/link";
import { ArtworkCard } from "@/components/artwork-card";
import { PageShell } from "@/components/page-shell";
import { ReviewsSection } from "@/components/reviews-section";
import { SectionHeading } from "@/components/section-heading";
import { featuredArtworks, availableOriginals } from "@/data/artworks";
import { businessInfo } from "@/data/businessInfo";
import { categories } from "@/data/categories";
import { orderingSteps } from "@/data/printOptions";

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
              Cambridge, Vermont
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-7xl leading-[0.9] tracking-tight text-stone-950 md:text-9xl">
              Christine Porter Fine Art
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-stone-600">
              {businessInfo.tagline}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/gallery">
              View Gallery
            </Link>
            <Link className="btn-secondary" href="/order-prints">
              Order Prints
            </Link>
            <Link className="btn-secondary" href="/originals">
              Ask About Originals
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredArtworks.slice(0, 4).map((artwork, index) => (
            <div
              key={artwork.id}
              className={index === 1 ? "pt-12" : index === 2 ? "-mt-10" : ""}
            >
              <ArtworkCard artwork={artwork} priority={index < 2} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Featured works"
            title="A softer catalog for artwork with a sense of place."
            copy="This preview gathers Christine's public work into a calm, editorial layout that feels more like a fine art print room than a generic portfolio."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredArtworks.slice(0, 3).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Gallery categories"
          copy="Organized by subject and medium so collectors can browse photography, original paintings, and print-ready works without the old gallery clutter."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="/gallery"
              className="rounded-[1.5rem] border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="font-serif text-3xl">{category.name}</p>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#e9ede4] py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Originals"
            title="Available originals"
            copy="Cards are structured for dimensions, pricing, and availability once Christine confirms each piece."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {availableOriginals.slice(0, 4).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Print ordering"
            title="A clear path from favorite piece to finished print."
            copy="For now, inquiries are mocked locally. The structure is ready for Supabase tables later."
          />
          <Link href="/order-prints" className="btn-primary mt-8 inline-flex">
            Start Print Inquiry
          </Link>
        </div>
        <ol className="grid gap-4">
          {orderingSteps.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-5 rounded-[1.25rem] border border-stone-200 bg-white p-5"
            >
              <span className="font-serif text-4xl text-sage">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-stone-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="Stowe Art Festival"
            title="A respectful place for updates."
            copy="After the Stowe Art Festival display loss, Christine shared updates about available artwork and remaining pieces. This page helps organize current works, print requests, and original artwork inquiries in one clear place."
          />
          <div className="self-end">
            <Link href="/stowe-art-festival" className="btn-secondary">
              Read the Story
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
