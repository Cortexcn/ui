import type { BlockFile } from "@/lib/blocks/types";

export const blogMasonry01Meta = {
  name: "Blog: Masonry Grid",
  description:
    "Blog posts in staggered columns, with cover pictures of mixed shapes under a heading and a short intro. Pointing at a post, or tabbing to it, dims the others and slides its summary up over the picture.",
  registryName: "blog-masonry-01",
  previewHeight: 1200,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
