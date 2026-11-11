import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  formatTemplateDate,
  type SiteTemplate,
  templatePartsLabel,
  templatePriceLabel,
} from "@/lib/site-templates";
import { TemplateBadge } from "./template-badge";
import { TemplateShotGrid, TemplateStack } from "./template-shots";

/** One template on /templates: what it is on the left, its page on the right. */
export function TemplateRow({ template }: { template: SiteTemplate }) {
  const href = `/templates/${template.slug}`;

  return (
    <article className="grid gap-6 py-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-10">
      <div className="flex flex-col items-start gap-3">
        <TemplateBadge template={template} />
        <h2 className="font-semibold text-2xl tracking-tight">
          <Link className="hover:underline" href={href}>
            {template.name}
          </Link>
        </h2>
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground text-sm">
          <span>
            Released{" "}
            <time dateTime={template.released}>
              {formatTemplateDate(template.released)}
            </time>
          </span>
          <span>{templatePartsLabel(template)}</span>
          <span className="font-medium text-foreground">
            {templatePriceLabel(template)}
          </span>
        </p>
        <p className="line-clamp-4 text-muted-foreground">
          {template.summary}.
        </p>
        <TemplateStack stack={template.stack} />
        <Button
          className="mt-1"
          nativeButton={false}
          render={<Link href={href} />}
          variant="outline"
        >
          View template
        </Button>
      </div>
      <TemplateShotGrid template={template} />
    </article>
  );
}
