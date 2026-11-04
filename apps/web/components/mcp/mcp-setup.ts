import { DOCS_URL } from "@/lib/site-url";

/** The hosted Cortexcn MCP server. Every client connects to this one URL. */
export const MCP_URL = `${DOCS_URL}/mcp`;

/** The full reference: tools, rate limits, and every supported client. */
export const MCP_DOCS_PATH = "/docs/integration/mcp";

/** A logo in public/logos. Themed logos have a file for each page theme. */
export interface ClientLogo {
  light: string;
  dark: string;
}

export interface CodeSample {
  lang: "bash" | "json" | "toml" | "text";
  /** A file name shown above the code, such as `.cursor/mcp.json`. */
  file?: string;
  code: string;
}

export interface SetupStep {
  /** One sentence. Text between backticks renders as inline code. */
  text: string;
  sample?: CodeSample;
}

export interface McpClient {
  id: string;
  name: string;
  logo: ClientLogo;
  steps: SetupStep[];
  /** A one-click install link, where the client has one. */
  action?: { label: string; href: string };
}

const CLAUDE_LOGO: ClientLogo = {
  light: "/logos/claude.svg",
  dark: "/logos/claude.svg",
};

/**
 * Cursor's install link carries the server config as base64 JSON:
 * {"url":"https://ui.cortexcn.dev/mcp"}.
 */
const CURSOR_INSTALL_URL =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=cortexcn&config=eyJ1cmwiOiJodHRwczovL3VpLmNvcnRleGNuLmRldi9tY3AifQ==";

/** Setup for the most used clients. The docs cover Zed, ChatGPT, and more. */
export const MCP_CLIENTS: McpClient[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    logo: CLAUDE_LOGO,
    steps: [
      {
        text: "Run this in your terminal:",
        sample: {
          lang: "bash",
          code: `claude mcp add --transport http cortexcn ${MCP_URL}`,
        },
      },
      {
        text: "Add `--scope user` to use it in every project. Run `/mcp` inside Claude Code to check that it is connected.",
      },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    logo: { light: "/logos/cursor-light.svg", dark: "/logos/cursor-dark.svg" },
    action: { label: "Add to Cursor", href: CURSOR_INSTALL_URL },
    steps: [
      {
        text: "Use the button, or add the server to `.cursor/mcp.json` in your project:",
        sample: {
          lang: "json",
          file: ".cursor/mcp.json",
          code: `{
  "mcpServers": {
    "cortexcn": {
      "url": "${MCP_URL}"
    }
  }
}`,
        },
      },
      {
        text: "Put the same entry in `~/.cursor/mcp.json` to use it in every project.",
      },
    ],
  },
  {
    id: "vscode",
    name: "VS Code",
    logo: {
      light: "/logos/stack/vscode.svg",
      dark: "/logos/stack/vscode.svg",
    },
    steps: [
      {
        text: "Add the server to `.vscode/mcp.json` in your project:",
        sample: {
          lang: "json",
          file: ".vscode/mcp.json",
          code: `{
  "servers": {
    "cortexcn": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`,
        },
      },
      {
        text: "It works with GitHub Copilot in agent mode.",
      },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    logo: {
      light: "/logos/windsurf-light.svg",
      dark: "/logos/windsurf-dark.svg",
    },
    steps: [
      {
        text: "Add the server to `mcp_config.json`:",
        sample: {
          lang: "json",
          file: "mcp_config.json",
          code: `{
  "mcpServers": {
    "cortexcn": {
      "serverUrl": "${MCP_URL}"
    }
  }
}`,
        },
      },
    ],
  },
  {
    id: "codex",
    name: "Codex CLI",
    logo: { light: "/logos/openai-light.svg", dark: "/logos/openai-dark.svg" },
    steps: [
      {
        text: "Run this in your terminal:",
        sample: {
          lang: "bash",
          code: `codex mcp add cortexcn --url ${MCP_URL}`,
        },
      },
      {
        text: "Or add it to `~/.codex/config.toml`:",
        sample: {
          lang: "toml",
          file: "~/.codex/config.toml",
          code: `[mcp_servers.cortexcn]
url = "${MCP_URL}"`,
        },
      },
    ],
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    logo: CLAUDE_LOGO,
    steps: [
      {
        text: "In Claude, open Customize, then Connectors, and choose Add custom connector.",
      },
      {
        text: "Paste the server URL and choose No sign-in:",
        sample: { lang: "text", code: MCP_URL },
      },
    ],
  },
];

/** Requests to try once the server is connected. Every item named is free. */
export const MCP_PROMPTS = [
  "Find a hero block with a product screenshot and add it to the landing page.",
  "Add the feature-bento-grid-01 block under the hero.",
  "What props does the Cortexcn dialog take?",
  "Show me the source of hero-cover-01 before we install it.",
];
