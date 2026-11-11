"use client";

import { Icon } from "@cortexcn/icons";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { CODE_PANEL_HEADER_CLASS } from "@/components/blocks/block-code-panel-header";
import { BlockFileTree } from "@/components/blocks/block-file-tree";
import { BlockProPanel } from "@/components/blocks/block-pro-panel";
import { CopyButton } from "@/components/copy-button";
import { ProBadge } from "@/components/docs/pro-install-panel";
import { V0Icon } from "@/components/icons/v0";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAnalyticsUrl, trackEvent } from "@/lib/analytics/track-client";
import {
  blockLivePreviewPath,
  blockOpenInV0Href,
  blockShadcnAddCommand,
} from "@/lib/blocks/block-links";
import { getDefaultSelectedFile } from "@/lib/blocks/build-file-tree";
import type { BlockDefinition } from "@/lib/blocks/types";
import { isProItem, PRO_PATH } from "@/lib/pro";
import { OPEN_SOURCE_REPO_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const BlockCodeBlock = dynamic(
  () =>
    import("@/components/blocks/block-code-block").then(
      (mod) => mod.BlockCodeBlock,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-lg border bg-muted/30 p-4 font-mono text-muted-foreground text-sm">
        Loading…
      </div>
    ),
  },
);

type BlockView = "preview" | "code";
type BlockViewport = "desktop" | "mobile";

const DEFAULT_PREVIEW_HEIGHT = 720;
const DEFAULT_MOBILE_WIDTH = 390;

function DeviceToggle({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex" />}>
        <Button
          aria-label={label}
          aria-pressed={active}
          className={cn("size-8", active && "bg-muted text-foreground")}
          onClick={onClick}
          size="icon"
          type="button"
          variant="ghost"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function BlockViewer({
  name,
  description,
  registryName,
  files,
  preview,
  previewHeight = DEFAULT_PREVIEW_HEIGHT,
  mobilePreviewWidth = DEFAULT_MOBILE_WIDTH,
  embedded = false,
}: BlockDefinition & { embedded?: boolean }) {
  const [view, setView] = useState<BlockView>("preview");
  const [viewport, setViewport] = useState<BlockViewport>("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const defaultFile = useMemo(() => getDefaultSelectedFile(files), [files]);
  const [selectedPath, setSelectedPath] = useState(
    () => defaultFile?.path ?? files[0]?.path ?? "",
  );

  const selectedFile =
    files.find((file) => file.path === selectedPath) ?? defaultFile ?? files[0];
  const installCommand = blockShadcnAddCommand(registryName);
  // Pro blocks keep their code private: the Code tab shows the Pro licenses
  // instead, and there is no install command or v0 button.
  const isPro = isProItem(registryName);

  // The live preview's Code button links here with #code.
  useEffect(() => {
    if (window.location.hash === "#code") {
      setView("code");
    }
  }, []);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "scroll-mt-28 overflow-hidden",
          embedded
            ? "bg-transparent"
            : "rounded-xl border border-border bg-card/70",
        )}
        id={registryName}
      >
        <div className="flex flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Tabs
              className="shrink-0"
              onValueChange={(value) => setView(value as BlockView)}
              value={view}
            >
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">
                  {isPro ? (
                    <Icon
                      aria-hidden="true"
                      className="size-3.5"
                      name="IconLock"
                    />
                  ) : null}
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {isPro ? <ProBadge /> : null}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-nowrap">
            {view === "preview" ? (
              <div className="flex items-center gap-0.5 rounded-md border border-border/60 bg-muted/20 p-0.5">
                <DeviceToggle
                  active={viewport === "desktop"}
                  label="Desktop"
                  onClick={() => setViewport("desktop")}
                >
                  <Icon className="size-4" name="IconImac" />
                </DeviceToggle>
                <DeviceToggle
                  active={viewport === "mobile"}
                  label="Mobile"
                  onClick={() => setViewport("mobile")}
                >
                  <Icon className="size-4" name="IconPhone" />
                </DeviceToggle>
              </div>
            ) : null}

            <Tooltip>
              <TooltipTrigger render={<span className="inline-flex" />}>
                <Button
                  aria-label="Restart animation"
                  className="size-8"
                  onClick={() => setPreviewKey((key) => key + 1)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Icon className="size-4" name="IconArrowRotateClockwise" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Restart animation</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={<span className="inline-flex" />}>
                <Button
                  className="size-8"
                  nativeButton={false}
                  render={
                    // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
                    <a
                      aria-label="Open the live preview in a new tab"
                      href={blockLivePreviewPath(registryName)}
                      rel="noopener"
                      target="_blank"
                    />
                  }
                  size="icon"
                  variant="ghost"
                >
                  <Icon className="size-4" name="IconEyeOpen" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Live preview</TooltipContent>
            </Tooltip>

            {isPro ? null : (
              <Tooltip>
                <TooltipTrigger render={<span className="inline-flex" />}>
                  <Button
                    className="size-8"
                    nativeButton={false}
                    render={
                      // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
                      <a
                        aria-label="View the source on GitHub"
                        href={`${OPEN_SOURCE_REPO_URL}/tree/main/registry/blocks/${registryName}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      />
                    }
                    size="icon"
                    variant="ghost"
                  >
                    <Icon className="size-4" name="IconGithub" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View source</TooltipContent>
              </Tooltip>
            )}

            {isPro ? (
              <Button
                className="gap-1.5 px-3 text-xs"
                nativeButton={false}
                render={
                  // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
                  <a href={PRO_PATH} />
                }
              >
                Get with Pro
              </Button>
            ) : null}
            <div
              className={cn(
                "hidden h-9 min-w-0 max-w-[300px] items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-2.5 font-mono text-[11px] text-muted-foreground",
                !isPro && "lg:flex",
              )}
            >
              <Icon className="size-3.5 shrink-0" name="IconConsole" />
              <span className="min-w-0 flex-1 truncate">{installCommand}</span>
              <CopyButton
                aria-label="Copy install command"
                className="size-7 shrink-0"
                text={installCommand}
              />
            </div>

            <Button
              className={cn("gap-1.5 px-3 text-xs", isPro && "hidden")}
              nativeButton={false}
              render={
                // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
                <a
                  aria-label="Open in v0"
                  href={blockOpenInV0Href(registryName)}
                  onClick={() => {
                    trackEvent("blocks_open_v0", {
                      name,
                      description,
                      registry_name: registryName,
                      install_command: installCommand,
                      preview_height: previewHeight,
                      mobile_preview_width: mobilePreviewWidth,
                      url: getAnalyticsUrl(),
                    });
                  }}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              variant="white"
            >
              Open in <V0Icon className="size-4" />
            </Button>
          </div>
        </div>

        {view === "preview" ? (
          <div
            // Safe centering: a block taller than the canvas, such as a
            // dashboard stacked for the mobile view, scrolls from its top
            // instead of overflowing above it.
            className="studio-preview-canvas items-center-safe justify-center-safe flex overflow-auto border-t px-3 py-10 sm:px-6 sm:py-[90px]"
            style={{ height: previewHeight }}
          >
            <div
              className={cn(
                "items-center-safe flex w-full justify-center transition-[max-width] duration-300 ease-out",
                viewport === "mobile" && "mx-auto",
              )}
              key={previewKey}
              style={{
                maxWidth:
                  viewport === "mobile" ? mobilePreviewWidth : undefined,
              }}
            >
              {preview}
            </div>
          </div>
        ) : null}

        {view === "code" && isPro ? (
          <BlockProPanel height={previewHeight} name={name} />
        ) : null}

        {view === "code" && !isPro ? (
          <div
            className="grid min-h-0 grid-cols-1 overflow-hidden border-t lg:grid-cols-[240px_minmax(0,1fr)]"
            style={{ height: previewHeight }}
          >
            <BlockFileTree
              files={files}
              onSelect={setSelectedPath}
              selectedPath={selectedPath}
            />

            <div className="flex h-full min-h-0 min-w-0 flex-col">
              {selectedFile ? (
                <>
                  <div
                    className={cn(
                      CODE_PANEL_HEADER_CLASS,
                      "justify-between gap-3",
                    )}
                  >
                    <p className="truncate font-mono text-muted-foreground text-xs">
                      {selectedFile.path}
                    </p>
                    <CopyButton
                      aria-label="Copy file"
                      text={selectedFile.content}
                    />
                  </div>

                  <div className="min-h-0 flex-1 overflow-auto">
                    <BlockCodeBlock
                      code={selectedFile.content}
                      lang={selectedFile.language ?? "tsx"}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
                  No files available.
                </div>
              )}
            </div>
          </div>
        ) : null}

        <span className="sr-only">{name}</span>
      </div>
    </TooltipProvider>
  );
}
