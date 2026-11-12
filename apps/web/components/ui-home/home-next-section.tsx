import { Container } from "./primitives";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

interface NextItem {
  title: string;
  description: string;
}

/** What is being built now, with no dates promised. */
const NEXT: NextItem[] = [
  {
    title: "AI chat apps",
    description:
      "Ready-made chat apps with streaming replies, built on the AI blocks, for you to run as your own product.",
  },
  {
    title: "More dashboard kits",
    description:
      "New kits for more kinds of product, each with every page, a data model, and a demo workspace.",
  },
  {
    title: "Micro-interactions for React",
    description:
      "Small motion details for buttons, menus, and forms, as React components that install like the rest of the library.",
  },
];

/** The product lines on the way, so visitors know what to come back for. */
export function HomeNextSection() {
  return (
    <section className="py-20 md:py-28" id="next">
      <Container>
        <SectionHeader
          badge="In the works"
          lines={[
            { text: "On the way." },
            { text: "What we're building now.", muted: true },
          ]}
        />
        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          {NEXT.map((item, index) => (
            <li className="min-w-0" key={item.title}>
              <Reveal className="h-full" delay={index * 100}>
                <div className="flex h-full flex-col gap-8 rounded-2xl border border-border border-dashed p-6">
                  <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 animate-pulse rounded-full bg-(--cta) motion-reduce:animate-none"
                    />
                    In progress
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl tracking-[-0.02em]">{item.title}</h3>
                    <p className="text-body text-sm leading-[1.5]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
