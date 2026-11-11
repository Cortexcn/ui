"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiToolRouter01Meta } from "./meta";
import { AiToolRouterPreview } from "./preview";

export function AiToolRouterBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiToolRouter01Meta}
      {...props}
      embedded={embedded}
      preview={<AiToolRouterPreview />}
    />
  );
}
