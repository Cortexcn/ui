import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@cortexcn/ui/components/accordion";
import Link from "next/link";
import type { ReactNode } from "react";

import { CONTACT_EMAIL } from "@/lib/contact-details";
import { PRO_PRICING_PATH } from "@/lib/pro";
import { PRO_COUNTS } from "@/lib/pro-licenses";
import { PLAN_REFUND_DAYS } from "@/lib/service-pricing";

import { Container } from "./primitives";
import { SectionHeader } from "./section-header";

export interface Question {
  question: string;
  answer: ReactNode;
}

function Code({ children }: { children: string }) {
  return (
    <code className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[13px] text-foreground">
      {children}
    </code>
  );
}

const QUESTIONS: Question[] = [
  {
    question: "How do I install a component?",
    answer: (
      <>
        Run <Code>npx shadcn@latest add @cortexcn/button</Code> with the name
        you want. Cortexcn is listed in the shadcn registry directory, so there
        is nothing to set up first. The CLI copies the source into your project
        and installs the packages it needs.
      </>
    ),
  },
  {
    question: "Can my AI agent add components for me?",
    answer:
      "Yes. Give Claude Code, Cursor, or Codex the shadcn MCP server, then ask for a component by name. The agent finds it in the registry and runs the install.",
  },
  {
    question: "Do I need shadcn/ui first?",
    answer: (
      <>
        Yes. Cortexcn builds on a shadcn/ui project with Tailwind CSS. If your
        project does not have one yet, run <Code>npx shadcn@latest init</Code>{" "}
        first.
      </>
    ),
  },
  {
    question: "Can I change the code?",
    answer:
      "Yes. The files live in your repo like the rest of your components, so you can restyle them, rename them, or rewrite them.",
  },
  {
    question: "What do the paid plans add?",
    answer: (
      <>
        Cortexcn Pro adds {PRO_COUNTS.charts} charts, the blocks built on them,
        and {PRO_COUNTS.templates} full website templates. Pick a 1-year,
        lifetime, or team license on the{" "}
        <Link href={PRO_PRICING_PATH}>pricing page</Link>. Each one is a
        one-time payment.
      </>
    ),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <>
        Yes. Paid plans can be refunded in full within {PLAN_REFUND_DAYS} days
        of purchase. The <Link href="/refunds">refund policy</Link> has the
        details.
      </>
    ),
  },
];

/** The heading and email on the left, the questions on the right. Pro reuses it. */
export function FaqList({ questions }: { questions: Question[] }) {
  return (
    <section className="py-20 md:py-28" id="faq">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--site-header-height)+2rem)] lg:self-start">
          <SectionHeader
            badge="FAQ"
            lines={[
              { text: "Good questions." },
              { text: "Straight answers.", muted: true },
            ]}
          />
          <p className="max-w-sm text-base text-body leading-[1.45]">
            Something else on your mind? Email{" "}
            <a
              className="text-foreground underline underline-offset-4 hover:no-underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <Accordion
          className="gap-3"
          collapsible
          defaultValue={questions[0]?.question}
          type="single"
        >
          {questions.map((item) => (
            <AccordionItem
              className="rounded-2xl border border-border bg-(--surface) px-5 md:px-6"
              key={item.question}
              value={item.question}
            >
              <AccordionTrigger className="items-center gap-4 py-5 font-normal text-[17px] tracking-[-0.01em] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-5 text-[15px] text-body leading-[1.55]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return <FaqList questions={QUESTIONS} />;
}
