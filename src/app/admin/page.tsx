import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";

const sections = [
  "artworks",
  "categories",
  "inquiries",
  "featured works",
  "availability",
  "pricing",
  "site settings",
];

export default function AdminPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Admin"
          title="Placeholder dashboard"
          copy="Mock admin structure for the future database-backed workflow."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section} className="rounded-[1.5rem] border border-stone-200 bg-white p-6">
              <p className="font-serif text-3xl capitalize">{section}</p>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                TODO: connect this panel to Supabase records, auth, and admin
                editing actions.
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
