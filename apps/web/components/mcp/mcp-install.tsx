"use client";

import { Icon } from "@cortexcn/icons";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import Link from "next/link";
import { type KeyboardEvent, useId, useRef, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { codeThemes } from "@/lib/code-theme";
import { cn } from "@/lib/utils";

import { ClientLogo } from "./client-logo";
import {
  type CodeSample,
  MCP_CLIENTS,
  MCP_DOCS_PATH,
  type McpClient,
} from "./mcp-setup";

/** Renders `text between backticks` as inline code. */
function StepText({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <p className="m-0 text-body text-sm leading-relaxed">
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            className="rounded-[0.3rem] bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground"
            // The text is static, so a part's position identifies it.
            key={`${index}-${part}`}
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function CodeCard({ sample }: { sample: CodeSample }) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-shell-lg border border-border bg-background">
      {sample.file ? (
        <figcaption className="border-border border-b px-4 py-2 font-mono text-muted-foreground text-xs">
          {sample.file}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto pr-12">
        <DynamicCodeBlock
          code={sample.code}
          codeblock={{
            allowCopy: false,
            className:
              "my-0 rounded-none border-0 bg-transparent [&_pre]:bg-transparent [&_pre]:whitespace-pre-wrap",
          }}
          lang={sample.lang}
          options={{ themes: codeThemes }}
        />
      </div>
      <CopyButton
        aria-label="Copy"
        className={cn(
          "absolute right-2 z-10",
          sample.file ? "top-10" : "top-2",
        )}
        text={sample.code}
      />
    </figure>
  );
}

function ClientPanel({ client }: { client: McpClient }) {
  return (
    <div className="flex flex-col gap-4">
      {client.action ? (
        <a
          className="inline-flex h-10 items-center gap-2 self-start rounded-shell-sm bg-foreground px-4 font-medium text-background text-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          href={client.action.href}
        >
          {/* The button is the inverse of the page, so the logo inverts too. */}
          <ClientLogo className="invert" logo={client.logo} size={16} />
          {client.action.label}
        </a>
      ) : null}
      {client.steps.map((step) => (
        <div className="flex flex-col gap-2.5" key={step.text}>
          <StepText text={step.text} />
          {step.sample ? <CodeCard sample={step.sample} /> : null}
        </div>
      ))}
    </div>
  );
}

/** How far each arrow key moves through the tabs. */
const ARROW_STEPS: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

/**
 * Setup for each AI client, one tab per client with its logo. The arrow
 * keys move between tabs, as in any tab list.
 */
export function McpInstall() {
  const [activeId, setActiveId] = useState(MCP_CLIENTS[0]?.id ?? "");
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const baseId = useId();
  const active =
    MCP_CLIENTS.find((client) => client.id === activeId) ?? MCP_CLIENTS[0];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = MCP_CLIENTS.findIndex((client) => client.id === activeId);
    const step = ARROW_STEPS[event.key];
    if (!step) {
      return;
    }
    event.preventDefault();
    const next =
      MCP_CLIENTS[(index + step + MCP_CLIENTS.length) % MCP_CLIENTS.length];
    if (next) {
      setActiveId(next.id);
      tabRefs.current.get(next.id)?.focus();
    }
  };

  return (
    <section
      aria-labelledby="install-heading"
      className="scroll-mt-24 border-border border-t px-4 py-20 sm:px-6 md:py-28"
      id="install"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3">
          <h2
            className="m-0 font-light font-sentient text-[clamp(2rem,5vw,3rem)] leading-[1.08] tracking-[-0.045em]"
            id="install-heading"
          >
            Install the MCP server
          </h2>
          <p className="m-0 max-w-xl text-body text-lg leading-[1.45]">
            Pick your assistant. Every client connects to the same URL, and
            there is nothing to sign in to.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div
            aria-label="AI assistants"
            aria-orientation="vertical"
            className="flex gap-1 overflow-x-auto rounded-shell-xl border border-border bg-card p-1.5 lg:flex-col lg:overflow-visible"
            onKeyDown={onKeyDown}
            role="tablist"
          >
            {MCP_CLIENTS.map((client) => {
              const selected = client.id === active?.id;
              return (
                <button
                  aria-controls={`${baseId}-panel`}
                  aria-selected={selected}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-shell-lg px-3 py-2.5 text-left font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none",
                    selected
                      ? "bg-muted text-foreground ring-1 ring-border"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                  id={`${baseId}-tab-${client.id}`}
                  key={client.id}
                  onClick={() => setActiveId(client.id)}
                  ref={(node) => {
                    if (node) {
                      tabRefs.current.set(client.id, node);
                    } else {
                      tabRefs.current.delete(client.id);
                    }
                  }}
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <ClientLogo logo={client.logo} size={18} />
                  {client.name}
                </button>
              );
            })}
          </div>

          {active ? (
            <div
              aria-labelledby={`${baseId}-tab-${active.id}`}
              className="rounded-shell-xl border border-border bg-card p-5 sm:p-6"
              id={`${baseId}-panel`}
              role="tabpanel"
            >
              <ClientPanel client={active} key={active.id} />
            </div>
          ) : null}
        </div>

        <p className="mt-6 flex items-center gap-1.5 text-muted-foreground text-sm">
          <Icon className="size-4 shrink-0" name="IconBook" />
          Using Zed, ChatGPT, or another client? The{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            href={`${MCP_DOCS_PATH}#connect-your-assistant`}
          >
            MCP reference
          </Link>{" "}
          covers them all.
        </p>
      </div>
    </section>
  );
}
