"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { heroTapestry01Meta } from "./meta";
import { HeroTapestryPreview } from "./preview";

export function HeroTapestryBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...heroTapestry01Meta}
      {...props}
      embedded={embedded}
      preview={<HeroTapestryPreview />}
    />
  );
}
