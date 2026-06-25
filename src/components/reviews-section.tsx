import { demoReviews } from "@/data/reviews";
import { SectionHeading } from "@/components/section-heading";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-lg tracking-[0.12em] text-[#f4b400]" aria-label={`${rating} stars`}>
      {"★".repeat(rating)}
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section className="border-y border-stone-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Collector notes"
            title="Early words from collectors"
            copy="Demo Google-style reviews for the preview site. These can be replaced with real reviews once Christine begins collecting them publicly."
          />
          <div className="rounded-full border border-stone-200 bg-[#fbf8f1] px-5 py-3 text-sm font-semibold text-stone-700">
            <span className="mr-2 text-[#4285f4]">G</span>
            Google reviews preview · 5.0
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {demoReviews.map((review) => (
            <article
              key={`${review.name}-${review.context}`}
              className="rounded-[1.75rem] border border-stone-200 bg-[#fbf8f1] p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-950 font-semibold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-950">{review.name}</p>
                    <p className="text-xs text-stone-500">{review.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sage">
                  {review.date}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <Stars rating={review.rating} />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  {review.context}
                </span>
              </div>
              <p className="mt-5 text-base leading-8 text-stone-700">
                “{review.text}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroReviews() {
  const featured = demoReviews.slice(0, 2);

  return (
    <div className="hidden max-w-xl lg:block">
      <div className="relative mt-12 rounded-[1.75rem] border border-stone-200 bg-white/72 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">
              Collector notes
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-sm font-semibold text-stone-700">
                Google reviews preview · 5.0
              </span>
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-[#fbf8f1] text-xl font-bold">
            <span className="text-[#4285f4]">G</span>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {featured.map((review) => (
            <article key={review.name} className="rounded-2xl bg-[#fbf8f1] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-950">{review.name}</p>
                  <p className="text-xs text-stone-500">
                    {review.location} · {review.context}
                  </p>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-650">
                “{review.text}”
              </p>
            </article>
          ))}
        </div>

        <p className="mt-4 text-xs leading-5 text-stone-500">
          Demo reviews for launch preview. Swap with live Google reviews once
          Christine starts collecting them.
        </p>
      </div>
    </div>
  );
}
