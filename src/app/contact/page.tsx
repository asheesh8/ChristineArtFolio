import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { businessInfo } from "@/data/businessInfo";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Contact"
          title="Ask about prints, originals, and framing."
          copy="Use this page for direct inquiries while the full ordering/admin workflow is still mocked."
        />
        <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">
            Studio
          </p>
          <p className="mt-4 font-serif text-4xl">{businessInfo.location}</p>
          <p className="mt-4 text-stone-600">{businessInfo.address}</p>
          <a
            href={`mailto:${businessInfo.email}`}
            className="mt-8 inline-flex text-lg font-semibold text-stone-950 underline underline-offset-4"
          >
            {businessInfo.email}
          </a>
        </div>
      </section>
    </PageShell>
  );
}
