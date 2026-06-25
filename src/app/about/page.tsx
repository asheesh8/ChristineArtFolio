import Image from "next/image";
import Link from "next/link";
import { FacebookShowcase } from "@/components/facebook-showcase";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { businessInfo } from "@/data/businessInfo";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Christine Porter"
            copy={businessInfo.intro}
          />
          <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-8 text-lg leading-9 text-stone-650">
            <p>
              Christine&apos;s work feels rooted in observation: flowers, animals,
              landscapes, weather, and the small visual moments that make Vermont
              feel remembered as much as seen.
            </p>
            <p className="mt-6">
              Her photography and fine art share the same quiet attention to
              place, light, and memory. Collectors can browse finished works,
              request prints, ask about originals, and begin a framing
              conversation directly.
            </p>
            <Link href="/contact" className="btn-primary mt-8 inline-flex">
              Contact Christine
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
          <div className="relative aspect-[4/5] min-h-[34rem]">
            <Image
              src="/christine-assets/christine-porter-artist-portrait.png"
              alt="Christine Porter holding a camera outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover object-[62%_center]"
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-[#fbf8f1]/92 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
              Artist portrait
            </p>
            <p className="mt-2 font-serif text-3xl text-stone-950">
              Photographer, painter, and observer of place.
            </p>
          </div>
        </div>
      </section>
      <FacebookShowcase />
    </PageShell>
  );
}
