import { Icon } from "@cortexcn/icons";
import Image from "next/image";
import Link from "next/link";
import {
  type SiteTemplate,
  type ThemedImage,
  templatePartsLabel,
} from "@/lib/site-templates";
import { cn } from "@/lib/utils";
import { TemplateScreenshotCrop } from "./template-screenshot";

/**
 * Views of a template's page, top to bottom: its first screen, then sections
 * further down the full-page capture, as CSS object-positions.
 */
const SHOTS = [
  { key: "first-screen", image: "card", position: "50% 0%" },
  { key: "upper", image: "desktop", position: "50% 22%" },
  { key: "middle", image: "desktop", position: "50% 42%" },
  { key: "lower", image: "desktop", position: "50% 62%" },
  { key: "end", image: "desktop", position: "50% 84%" },
] as const;

interface TemplateShot {
  key: string;
  image: ThemedImage;
  position: string;
}

/**
 * Five views of a template: crops of the full-page capture for a landing
 * page, or the first screen of each page for a multi-page template.
 */
function templateShots(template: SiteTemplate): TemplateShot[] {
  if (template.pageShots) {
    return [
      {
        key: "first-screen",
        image: template.screenshots.card,
        position: "50% 0%",
      },
      ...template.pageShots.map((page) => ({
        key: page.name,
        image: page.image,
        position: "50% 0%",
      })),
    ].slice(0, SHOTS.length);
  }
  return SHOTS.map((shot) => ({
    key: shot.key,
    image: template.screenshots[shot.image],
    position: shot.position,
  }));
}

function Shot({ shot, sizes }: { shot: TemplateShot; sizes: string }) {
  return (
    <span className="relative block aspect-[4/3] overflow-hidden rounded-lg border bg-muted">
      <TemplateScreenshotCrop
        image={shot.image}
        position={shot.position}
        sizes={sizes}
      />
    </span>
  );
}

/**
 * The grid beside each template on /templates: five views of the page and a
 * tile with how many more sections it has. The whole grid opens the
 * template's page, so keyboard users stop on it once.
 */
export function TemplateShotGrid({ template }: { template: SiteTemplate }) {
  const shots = templateShots(template);
  const more = template.sections.length - shots.length;

  return (
    <Link
      className="grid grid-cols-2 gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:grid-cols-3"
      href={`/templates/${template.slug}`}
    >
      <span className="sr-only">View the {template.name} template</span>
      {shots.map((shot, index) => (
        <span
          className={cn(
            "transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none",
            // Phones show four views and the tile.
            index === shots.length - 1 && "hidden sm:block",
          )}
          key={shot.key}
        >
          <Shot
            shot={shot}
            sizes="(min-width: 1280px) 260px, (min-width: 640px) 30vw, 45vw"
          />
        </span>
      ))}
      <span className="flex aspect-[4/3] items-center justify-center gap-2 rounded-lg border bg-muted/50 font-medium text-sm transition-colors hover:bg-muted">
        {more > 0
          ? `${templatePartsLabel(template, more)} more`
          : "See every section"}
        <Icon className="size-4" name="IconArrowRight" />
      </span>
    </Link>
  );
}

/**
 * The column of views beside the full-page capture on a template's page,
 * ending in a tile that opens the live preview.
 */
export function TemplateShotRail({ template }: { template: SiteTemplate }) {
  return (
    <ul className="flex flex-col gap-3">
      {templateShots(template).map((shot) => (
        <li key={shot.key}>
          <Shot shot={shot} sizes="140px" />
        </li>
      ))}
      {template.previewUrl ? (
        <li>
          <a
            className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-lg border bg-muted/50 p-2 text-center font-medium text-xs transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
            href={template.previewUrl}
            rel="noopener"
            target="_blank"
          >
            Preview demo
            <span className="font-normal text-muted-foreground">
              all {templatePartsLabel(template)}
            </span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}

/** "Next.js 16", "React 19", ... as small chips, with the Next.js mark first. */
export function TemplateStack({ stack }: { stack: string[] }) {
  return (
    <ul aria-label="Built with" className="flex flex-wrap items-center gap-1.5">
      {stack.map((item) => (
        <li
          className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground"
          key={item}
        >
          {item.startsWith("Next.js") ? (
            <>
              <Image
                alt=""
                className="size-3.5 dark:hidden"
                height={14}
                src="/logos/stack/nextjs-light.svg"
                width={14}
              />
              <Image
                alt=""
                className="hidden size-3.5 dark:block"
                height={14}
                src="/logos/stack/nextjs-dark.svg"
                width={14}
              />
            </>
          ) : null}
          {item}
        </li>
      ))}
    </ul>
  );
}
