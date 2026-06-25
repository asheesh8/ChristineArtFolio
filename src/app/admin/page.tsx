import { AdminDashboard } from "@/components/admin-dashboard";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Desk | Christine Porter Fine Art",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Admin"
          title="Christine's studio desk"
          copy="A practical dashboard for inquiries, follow-ups, inventory SKUs, featured works, availability, and pricing notes."
        />
        <div className="mt-10">
          <AdminDashboard />
        </div>
      </section>
    </PageShell>
  );
}
