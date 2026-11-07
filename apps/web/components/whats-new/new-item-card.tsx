import { Badge } from "@cortexcn/ui/components/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@cortexcn/ui/components/card";
import Link from "next/link";
import type { NewEntry, NewItemType } from "@/lib/whats-new";
import { NewItemVisual } from "./new-item-visual";

const TYPE_LABEL: Record<NewItemType, string> = {
  component: "Component",
  block: "Block",
  template: "Template",
};

/**
 * One item on the /new feed, as a library Card: its picture, name, one line
 * about it, a Free, Pro, or price badge, and what kind of item it is. The
 * whole card links to its page; the picture is inert, since live previews
 * hold controls of their own.
 */
export function NewItemCard({ entry }: { entry: NewEntry }) {
  const kind = entry.type === "template" ? entry.group : TYPE_LABEL[entry.type];
  const group = entry.type === "template" ? null : entry.group;

  return (
    <Card className="group relative h-full gap-0 py-0 transition-shadow duration-300 hover:shadow-lg has-[>a:focus-visible]:ring-2 has-[>a:focus-visible]:ring-ring motion-reduce:transition-none">
      <div
        className="pointer-events-none aspect-4/3 overflow-hidden border-b bg-muted/40"
        inert
      >
        <NewItemVisual visual={entry.visual} />
      </div>

      <CardHeader className="py-4">
        <CardTitle className="truncate">{entry.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {entry.description}
        </CardDescription>
        <CardAction>
          <Badge variant={entry.pro ? "default" : "outline"}>
            {entry.access}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="mt-auto gap-1.5 py-3 text-muted-foreground text-xs">
        <span>{kind}</span>
        {group ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="truncate">{group}</span>
          </>
        ) : null}
        {entry.updated ? (
          <Badge className="ml-auto" variant="secondary">
            Updated
          </Badge>
        ) : null}
      </CardFooter>

      {/* Full-card link, outside the picture so no control nests inside it. */}
      <Link className="absolute inset-0 outline-none" href={entry.href}>
        <span className="sr-only">
          {entry.name}, {kind}
          {entry.updated ? ", updated" : ""}
        </span>
      </Link>
    </Card>
  );
}
