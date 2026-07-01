import type { ReactNode } from "react";
import { ImmersiveBackground } from "@/components/immersive-background";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col text-stone-950">
      <ImmersiveBackground imageSrc="/immersive-background.png" />
      <SiteHeader />
      <ScrollProgress />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
