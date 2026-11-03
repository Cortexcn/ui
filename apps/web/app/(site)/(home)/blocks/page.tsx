import type { Metadata } from "next";
import { Suspense } from "react";
import {
  BlockGallery,
  BlockGalleryView,
} from "@/components/blocks/block-gallery";
import { BlocksHero } from "@/components/blocks/blocks-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { getGalleryBlocks, getGalleryCategories } from "@/lib/blocks/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blocks",
  description:
    "Sections, chart groups, and dashboards for landing pages and apps, built with shadcn/ui and Tailwind CSS. Browse every block from A to Z and preview each one live.",
  path: "/blocks",
});

export default function BlocksPage() {
  const blocks = getGalleryBlocks();
  const categories = getGalleryCategories();
  const pro = blocks.filter((block) => block.pro).length;

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blocks", path: "/blocks" },
        ])}
      />
      <BlocksHero free={blocks.length - pro} pro={pro} total={blocks.length} />

      <section
        className="relative w-full scroll-mt-28 pb-16 md:pb-24"
        id="blocks"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* The URL holds the filters, so the static HTML is the unfiltered
              gallery and the client swaps in the filtered one. */}
          <Suspense
            fallback={
              <BlockGalleryView blocks={blocks} categories={categories} />
            }
          >
            <BlockGallery blocks={blocks} categories={categories} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
