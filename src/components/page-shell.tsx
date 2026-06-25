import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f1] text-stone-950">
      <SiteHeader />
      <ScrollProgress />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
