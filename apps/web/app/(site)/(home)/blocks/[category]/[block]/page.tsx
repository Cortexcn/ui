import { Icon } from "@cortexcn/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlockElement } from "@/blocks";
import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { AccessTag } from "@/components/blocks/access-tag";
import { FeaturedBlocks } from "@/components/blocks/featured-blocks";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  blockPagePath,
  type GalleryBlock,
  getAdjacentBlocks,
  getGalleryBlock,
} from "@/lib/blocks/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface BlockPageProps {
  params: Promise<{ category: string; block: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOCK_CATEGORIES.flatMap((category) =>
    category.blocks.map((block) => ({ category: category.slug, block })),
  );
}

async function findBlock(params: BlockPageProps["params"]) {
  const { category, block } = await params;
  const found = getGalleryBlock(block);
  if (!found || found.categorySlug !== category) {
    notFound();
  }
  return found;
}

export async function generateMetadata({
  params,
}: BlockPageProps): Promise<Metadata> {
  const block = await findBlock(params);
  return pageMetadata({
    title: `${block.title} ${block.categoryName.toLowerCase()} block`,
    description: block.description,
    path: block.href,
    image: {
      title: block.title,
      section: `Blocks / ${block.categoryName}`,
      item: block.slug,
    },
  });
}

/** One of the previous and next links under the block, in A to Z order. */
function NeighborLink({
  block,
  direction,
}: {
  block: GalleryBlock;
  direction: "previous" | "next";
}) {
  const next = direction === "next";
  return (
    <Link
      className={cn(
        "group flex flex-col gap-1 rounded-2xl border border-border p-5 transition-colors hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
        next && "items-end text-right",
      )}
      href={block.href}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
        {next ? null : (
          <Icon
            className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
            name="IconArrowLeft"
          />
        )}
        {next ? "Next block" : "Previous block"}
        {next ? (
          <Icon
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            name="IconArrowRight"
          />
        ) : null}
      </span>
      <span className="font-light font-sentient text-2xl tracking-[-0.04em]">
        {block.title}
      </span>
      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
        {block.categoryName}
      </span>
    </Link>
  );
}

export default async function BlockPage({ params }: BlockPageProps) {
  const block = await findBlock(params);
  const categoryHref = `/blocks?category=${block.categorySlug}`;
  const { previous, next } = getAdjacentBlocks(block.slug);

  return (
    <main className="flex flex-1 flex-col gap-10 md:gap-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blocks", path: "/blocks" },
          { name: block.categoryName, path: categoryHref },
          {
            name: block.title,
            path: blockPagePath(block.categorySlug, block.slug),
          },
        ])}
      />
      <section className="container mx-auto w-full pt-10 md:pt-14">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-muted-foreground text-sm"
        >
          <Link
            className="transition-colors hover:text-foreground"
            href="/blocks"
          >
            Blocks
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            className="transition-colors hover:text-foreground"
            href={categoryHref}
          >
            {block.categoryName}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="truncate text-foreground">
            {block.title}
          </span>
        </nav>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex min-w-0 flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                className="rounded-full border border-border px-3 py-1 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                href={categoryHref}
              >
                {block.categoryName}
              </Link>
              <AccessTag pro={block.pro} />
            </div>
            <h1 className="text-balance font-light font-sentient text-[2.75rem] leading-[1.05] tracking-[-0.05em] md:text-6xl">
              {block.title}
            </h1>
            <p className="max-w-3xl text-pretty text-lg text-muted-foreground leading-relaxed">
              {block.description}
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href={categoryHref} />}
            size="lg"
            variant="outline"
          >
            More {block.categoryName.toLowerCase()} blocks
          </Button>
        </div>
      </section>

      <section className="relative w-full">
        <div className="container mx-auto w-full overflow-visible">
          <FeaturedBlocks blocks={[getBlockElement(block.slug)]} />
        </div>
      </section>

      {previous && next ? (
        <nav
          aria-label="Previous and next blocks, A to Z"
          className="container mx-auto grid w-full gap-4 pb-16 sm:grid-cols-2 md:pb-24"
        >
          <NeighborLink block={previous} direction="previous" />
          <NeighborLink block={next} direction="next" />
        </nav>
      ) : null}
    </main>
  );
}
