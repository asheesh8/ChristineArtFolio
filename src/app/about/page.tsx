import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { businessInfo } from "@/data/businessInfo";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="About"
          title="Christine Porter"
          copy={businessInfo.intro}
        />
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-lg leading-9 text-stone-650">
          <p>
            Christine&apos;s work feels rooted in observation: flowers, animals,
            landscapes, weather, and the small visual moments that make Vermont
            feel remembered as much as seen.
          </p>
          <p className="mt-6">
            This redesign gives her artwork room to breathe while making the
            practical side clearer for collectors: browse the work, request a
            print, ask about an original, and start a framing conversation.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Contact Christine
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
