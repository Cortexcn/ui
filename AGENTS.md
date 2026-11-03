# Agent guide (Cortexcn)

Cortexcn is a Bun and Turborepo workspace for a shadcn registry of React components and page blocks for Tailwind CSS, and its docs website. This is the public part of the source; CONTRIBUTING.md has the full structure and setup. Files that render a "Pro" placeholder stand in for Cortexcn Pro code that is private; leave them as they are.

## Where things live

| Area | Path |
| --- | --- |
| Components | `packages/ui/src/components/` |
| Hooks, utilities, tokens | `packages/ui/src/hooks/`, `packages/ui/src/lib/`, `packages/ui/src/styles/` |
| Agent files shipped to users | `packages/ui/src/agents/` |
| Registry source | `packages/ui/registry.json` |
| Registry build output | `apps/web/public/r/` (written by `bun run registry:build`, never edited by hand) |
| Blocks | `apps/web/blocks/<block>/files/` |
| Docs pages | `apps/web/content/docs/<family>/<name>.mdx` |
| Website routes and components | `apps/web/app/`, `apps/web/components/` |

## Commands

- `bun install`
- `bun dev` (the site at http://localhost:4420)
- `bun run lint` and `bun run lint:fix`
- `bun run registry:build`
- `bun run build`, then `bun run check-types`

Keep the `run`: `bun build` and `bun test` are Bun's own tools, not these scripts.

## Rules

- Use Bun only. Never add a pnpm, npm, or yarn lockfile.
- Components import `cn` from `@/lib/utils` and use the design tokens for color and radius. Every change works in light and dark mode, from the keyboard, with a focus ring, and with `prefers-reduced-motion`.
- Fix Biome's findings: `interface` over `type`, no array-index keys, width and height on images.
- Conventional Commit messages: `feat(components): ...`, `fix(blocks): ...`, `docs(docs): ...`.
- No em dashes and no emojis in code, comments, or commit messages. Honest claims only.
