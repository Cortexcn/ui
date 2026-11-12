import { AgentRing } from "./home-agent-ring";
import { Container } from "./primitives";
import { ShowcaseCopy } from "./product-showcase";

/** The MCP server, with the agents it works with around what they can install. */
export function HomeMcpSection() {
  return (
    <section className="scroll-mt-20 py-16 md:py-24" id="mcp">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <ShowcaseCopy
            badge="MCP and agents"
            className="lg:col-span-5"
            description="Connect Claude Code, Cursor, Codex, or any MCP client once. Then ask for a feature bento below the hero, and your agent finds the block, reads its source and your design rules, and installs it in your repo."
            lines={[
              { text: "Ask your agent." },
              { text: "It knows the library.", muted: true },
            ]}
            primary={{ label: "Connect your agent", href: "/mcp-server" }}
            secondary={{
              label: "Read the docs",
              href: "/docs/integration/mcp",
            }}
            tag="Works with any MCP agent"
          />
          <AgentRing className="lg:col-span-7" />
        </div>
      </Container>
    </section>
  );
}
