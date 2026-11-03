# apps/web

The Cortexcn docs website, [ui.cortexcn.dev](https://ui.cortexcn.dev), built with Next.js and Fumadocs.

```bash
bun dev
```

Then open [localhost:4420/docs](http://localhost:4420/docs).

| Path | What it is |
| --- | --- |
| `app` | Routes and pages |
| `blocks/<block>` | Each page block: its source in `files/`, its preview, and its metadata |
| `components` | Site components and the docs demos |
| `content/docs` | The docs pages, in MDX |
| `lib` | Site helpers and data |
| `public/r` | The built registry that `npx shadcn add` installs from |

A few parts of the live site are not here: Cortexcn Pro (the charts and Pro blocks), sign-in, the admin pages, and the freelance studio. Where a page shows something built with Pro, a small stand-in renders a placeholder card instead.
