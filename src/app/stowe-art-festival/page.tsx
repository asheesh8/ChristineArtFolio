import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

export default function StoweArtFestivalPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Stowe Art Festival"
          title="Updates after the display loss"
          copy="After the Stowe Art Festival display loss, Christine shared updates about available artwork and remaining pieces. This page helps organize current works, print requests, and original artwork inquiries in one clear place."
        />
        <div className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-8 text-lg leading-9 text-stone-600">
          <p>
            This section is designed to stay factual and calm. It can hold
            Christine&apos;s own updates, current availability, recovered or remaining
            pieces, and links into the print and original artwork inquiry flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/originals" className="btn-primary">
              View Originals
            </Link>
            <Link href="/order-prints" className="btn-secondary">
              Request a Print
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
