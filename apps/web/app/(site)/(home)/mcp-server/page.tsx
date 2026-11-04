import type { Metadata } from "next";

import { McpExplainer } from "@/components/mcp/mcp-explainer";
import { McpFlow } from "@/components/mcp/mcp-flow";
import { McpHero } from "@/components/mcp/mcp-hero";
import { McpInstall } from "@/components/mcp/mcp-install";
import { McpPrompts } from "@/components/mcp/mcp-prompts";
import { JsonLd } from "@/components/seo/json-ld";
import { SENTIENT_STYLESHEET } from "@/components/ui-home/fonts";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "MCP server for Claude Code, Cursor, and VS Code",
  description:
    "Connect your AI assistant to the Cortexcn MCP server. It searches the registry, reads each item's docs and source, and installs components and blocks into your project. Hosted, read-only, and free, with no sign-in.",
  path: "/mcp-server",
  image: { title: "The Cortexcn MCP server", section: "MCP" },
});

/**
 * The MCP server's own page: what MCP is, how the server helps, and setup
 * for each AI client. Every "MCP server" link on the site lands here; the
 * docs page under /docs/integration/mcp stays the full reference.
 */
export default function McpServerPage() {
  return (
    <main className="flex flex-1 flex-col">
      <link href={SENTIENT_STYLESHEET} precedence="default" rel="stylesheet" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "MCP server", path: "/mcp-server" },
        ])}
      />
      <McpHero />
      <McpFlow />
      <McpExplainer />
      <McpInstall />
      <McpPrompts />
    </main>
  );
}
