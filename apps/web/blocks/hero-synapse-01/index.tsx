"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { heroSynapse01Meta } from "./meta";
import { HeroSynapsePreview } from "./preview";

export function HeroSynapseBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...heroSynapse01Meta}
      {...props}
      embedded={embedded}
      preview={<HeroSynapsePreview />}
    />
  );
}
