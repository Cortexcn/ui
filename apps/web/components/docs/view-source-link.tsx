import { Icon } from "@cortexcn/icons";

import { Button } from "@/components/ui/button";

/** Opens a free item's source in the public GitHub repository. */
export function ViewSourceLink({ href }: { href: string }) {
  return (
    <Button
      nativeButton={false}
      render={
        // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
        <a
          aria-label="View the source on GitHub"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        />
      }
      size="default"
      variant="outline"
    >
      <Icon aria-hidden="true" className="size-3.5" name="IconGithub" />
      <span className="hidden sm:inline">View source</span>
    </Button>
  );
}
