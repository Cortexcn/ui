import type { Metadata } from "next";

import { LibraryNotFound } from "@/components/not-found/library-not-found";
import { NotFoundSwitch } from "@/components/not-found/not-found-switch";
import { ProductNotFound } from "@/components/not-found/product-not-found";
import { StudioNotFound } from "@/components/not-found/studio-not-found";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist on Cortexcn.",
};

/**
 * Every 404 on all three hosts lands here, both unmatched addresses and
 * `notFound()` calls. It stays static, and the switch picks the site.
 */
export default function NotFound() {
  return (
    <NotFoundSwitch
      fallback={
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-24 text-center">
          <p className="font-mono text-muted-foreground text-sm">404</p>
          <h1 className="font-medium text-2xl tracking-tight">
            Page not found
          </h1>
        </main>
      }
      library={<LibraryNotFound />}
      product={<ProductNotFound />}
      studio={<StudioNotFound />}
    />
  );
}
