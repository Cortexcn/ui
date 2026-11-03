# CLAUDE.md

Rules for any agent working in this repository. `AGENTS.md` (imported below) has the layout and commands; CONTRIBUTING.md has the full structure.

@AGENTS.md

## What this repository is

The public part of the Cortexcn source: the docs website, the free components and blocks, the docs, and the registry. Cortexcn Pro and a few private parts of the site (sign-in, the admin pages, and the freelance studio) live in private repositories; files that render a "Pro" placeholder stand in for them. On every push to main there, a sync updates this repository, so:

- Pull requests are welcome. A maintainer brings an accepted change into the main source, the next sync lands it here, and the pull request is closed with a link to that sync commit.
- Never add Cortexcn Pro code: the Cortexcn components (such as Marquee, Gooey Nav, and Lanyard), the AI components, the charts, the Pro blocks, or the templates. They are paid.
- `apps/web/public/r` is generated. Change the source, then run `bun run registry:build`.

## Licensing

- Cortexcn's own code is MIT (LICENSE).
- Items adapted from other projects keep their original licenses and credit headers; NOTICE.md lists them. Keep the Apache-2.0 headers on the AI Elements and Spectrum UI items.
- Accept only code the contributor wrote, or code under a license that allows redistribution. Never accept React Bits code: its Commons Clause forbids redistributing it, even ported.

## Writing

- No em dashes and no emojis, in code, comments, or commit messages.
- Honest claims only: no invented users, numbers, or testimonials.
- Plain, concrete sentences about what the reader sees and does.
