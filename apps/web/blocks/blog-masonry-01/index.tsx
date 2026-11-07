"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { blogMasonry01Meta } from "./meta";
import { BlogMasonryPreview } from "./preview";

export function BlogMasonryBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...blogMasonry01Meta}
      {...props}
      embedded={embedded}
      preview={<BlogMasonryPreview />}
    />
  );
}
