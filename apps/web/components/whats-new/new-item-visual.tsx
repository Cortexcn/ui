import Image from "next/image";
import { ComponentArt } from "@/components/docs/component-art";
import {
  ComponentThumbnail,
  hasComponentThumbnail,
} from "@/components/docs/component-thumbnails";
import { cn } from "@/lib/utils";
import type { NewItemVisual as Visual } from "@/lib/whats-new";
import { LazyBlockPreview } from "./lazy-block-preview";

const zoomOnHover =
  "transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none";

/**
 * The 4:3 picture on a /new card: a block's live preview, a component's live
 * thumbnail or line drawing, or a template's screenshot in each theme.
 */
export function NewItemVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "block") {
    return <LazyBlockPreview slug={visual.slug} />;
  }
  if (visual.kind === "art") {
    if (visual.family === "components" && hasComponentThumbnail(visual.slug)) {
      return <ComponentThumbnail slug={visual.slug} />;
    }
    return (
      <ComponentArt
        className={zoomOnHover}
        family={visual.family}
        name={visual.slug}
      />
    );
  }
  const imageClassName = cn(
    "aspect-4/3 h-auto w-full object-cover object-top",
    zoomOnHover,
  );
  return (
    <>
      <Image
        alt=""
        className={cn(imageClassName, "dark:hidden")}
        height={visual.height}
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        src={visual.light}
        width={visual.width}
      />
      <Image
        alt=""
        className={cn(imageClassName, "hidden dark:block")}
        height={visual.height}
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        src={visual.dark}
        width={visual.width}
      />
    </>
  );
}
