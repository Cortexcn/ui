import Image from "next/image";

import { Container } from "./primitives";

interface StackLogo {
  name: string;
  /** File stem in /logos/stack, which has `-light` and `-dark` files. */
  slug: string;
  /** Wordmarks already spell the name; icons get a text label beside them. */
  kind: "wordmark" | "icon";
  /** Intrinsic viewBox ratio (width / height). */
  ratio: number;
  /** Rendered height in px, tuned per logo so they read at a similar size. */
  height: number;
}

/** What the components are built with, and the agent that installs them. */
const LOGOS: StackLogo[] = [
  { name: "Next.js", slug: "nextjs", kind: "icon", ratio: 1, height: 22 },
  {
    name: "React",
    slug: "react",
    kind: "wordmark",
    ratio: 600 / 180.32,
    height: 24,
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    kind: "wordmark",
    ratio: 262 / 33,
    height: 16,
  },
  { name: "shadcn/ui", slug: "shadcn", kind: "icon", ratio: 1, height: 20 },
  {
    name: "Motion",
    slug: "motion",
    kind: "icon",
    ratio: 1103 / 386,
    height: 14,
  },
  {
    name: "Claude",
    slug: "claude",
    kind: "wordmark",
    ratio: 512 / 110,
    height: 20,
  },
];

function LogoImage({
  logo,
  variant,
  className,
}: {
  logo: StackLogo;
  variant: "light" | "dark";
  className: string;
}) {
  return (
    <Image
      alt=""
      className={className}
      height={logo.height}
      src={`/logos/stack/${logo.slug}-${variant}.svg`}
      style={{ height: logo.height, width: "auto" }}
      unoptimized
      width={Math.round(logo.height * logo.ratio)}
    />
  );
}

function LogoItem({ logo }: { logo: StackLogo }) {
  return (
    <li className="flex shrink-0 items-center gap-2 opacity-75 grayscale">
      <LogoImage className="dark:hidden" logo={logo} variant="light" />
      <LogoImage className="hidden dark:block" logo={logo} variant="dark" />
      {logo.kind === "icon" ? (
        <span className="whitespace-nowrap font-medium text-foreground text-lg tracking-[-0.03em]">
          {logo.name}
        </span>
      ) : (
        <span className="sr-only">{logo.name}</span>
      )}
    </li>
  );
}

/** One still row of the tools Cortexcn is built with. */
export function StackTicker() {
  return (
    <Container className="mt-16 md:mt-20">
      <p className="text-center text-muted-foreground text-sm">
        What every component is built with, and the agent that adds it for you
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
        {LOGOS.map((logo) => (
          <LogoItem key={logo.name} logo={logo} />
        ))}
      </ul>
    </Container>
  );
}
