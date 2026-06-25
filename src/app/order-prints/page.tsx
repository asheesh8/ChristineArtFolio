import { PrintInquiryForm } from "@/components/print-inquiry-form";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { Suspense } from "react";

export default function OrderPrintsPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Order prints"
            title="Choose a piece, then send a clean print inquiry."
            copy="Browse the catalog, pick the artwork, and the form will carry its SKU through the request so Christine knows exactly which piece the client wants."
          />
        </div>
        <div className="mt-10">
          <Suspense fallback={<div className="rounded-[2rem] bg-white p-8">Loading catalog...</div>}>
            <PrintInquiryForm />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
