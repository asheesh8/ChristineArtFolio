import { PrintInquiryForm } from "@/components/print-inquiry-form";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { orderingSteps } from "@/data/printOptions";

export default function OrderPrintsPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Order prints"
            title="Request a print, then Christine confirms the details."
            copy="A guided print inquiry keeps the order process calm: choose the work, select print details, share contact information, then review before sending."
          />
          <ol className="mt-8 grid gap-3">
            {orderingSteps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-stone-200 bg-white p-4">
                <span className="mr-3 font-serif text-2xl text-sage">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <PrintInquiryForm />
      </section>
    </PageShell>
  );
}
