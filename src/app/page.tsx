import Link from "next/link";
import { ArtworkCard } from "@/components/artwork-card";
import { FacebookShowcase } from "@/components/facebook-showcase";
import { PageShell } from "@/components/page-shell";
import { HeroReviews } from "@/components/reviews-section";
import { SectionHeading } from "@/components/section-heading";
import { featuredArtworks, availableOriginals } from "@/data/artworks";
import { businessInfo } from "@/data/businessInfo";
import { categories } from "@/data/categories";
import { orderingSteps } from "@/data/printOptions";

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:items-center lg:py-16">
        <div className="artfolio-pane rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-600">
              Cambridge, Vermont
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl leading-[0.92] tracking-tight text-stone-950 sm:text-7xl md:text-8xl xl:text-9xl">
              Christine Porter Fine Art
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl sm:leading-9">
              {businessInfo.tagline}
            </p>
            <HeroReviews />
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

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {featuredArtworks.slice(0, 4).map((artwork, index) => (
            <div
              key={artwork.id}
              className={
                index === 1
                  ? "pt-10"
                  : index === 2
                    ? "-mt-8"
                    : index === 3
                      ? "pt-4"
                      : ""
              }
            >
              <ArtworkCard artwork={artwork} priority={index < 2} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href="/gallery"
              className="artfolio-panel group rounded-xl p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/86"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-serif text-3xl leading-none">{category.name}</p>
                <span className="text-lg transition group-hover:translate-x-1">&rarr;</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Featured works"
            title="A softer catalog for artwork with a sense of place."
            copy="Christine's work is gathered into a calm, editorial layout that feels more like a fine art print room than a generic portfolio."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredArtworks.slice(0, 3).map((artwork, index) => (
              <div key={artwork.id} className={index === 1 ? "md:mt-12" : ""}>
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9ede4]/72 py-16 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <SectionHeading
              eyebrow="Originals"
              title="Available originals"
              copy="Browse original works, ask about availability, or request a print when the original is not the right fit."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="artfolio-panel rounded-xl p-5">
                <p className="font-serif text-4xl">{availableOriginals.length}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-sage">
                  original inquiries
                </p>
              </div>
              <div className="artfolio-panel rounded-xl p-5">
                <p className="font-serif text-2xl">Prints</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Most works can begin as a print request while Christine confirms
                  sizing and availability.
                </p>
              </div>
              <div className="artfolio-panel rounded-xl p-5">
                <p className="font-serif text-2xl">Framing</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Ask about framing ideas, gifting timelines, and local pickup.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/originals" className="btn-primary">
                View Originals
              </Link>
              <Link href="/contact" className="btn-secondary">
                Ask Christine
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {availableOriginals.slice(0, 4).map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      <FacebookShowcase />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="artfolio-pane rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Print ordering"
            title="A clear path from favorite piece to finished print."
            copy="Choose a piece, request print details, and Christine can personally confirm availability, price, and timing."
          />
          <Link href="/order-prints" className="btn-primary mt-8 inline-flex">
            Start Print Inquiry
          </Link>
        </div>
        <ol className="grid gap-4">
          {orderingSteps.map((step, index) => (
            <li
              key={step}
              className="artfolio-panel flex items-center gap-5 rounded-xl p-5"
            >
              <span className="font-serif text-4xl text-sage">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-stone-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-stone-200/60 bg-white/68 py-16 backdrop-blur">
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
