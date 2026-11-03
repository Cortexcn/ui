/**
 * Pure helpers for stamp-registry.mjs: what the public registry says about
 * where an item came from, which revision it is, and what it installs.
 */
import { createHash } from "node:crypto";
import ts from "typescript";

export const DEFAULT_LICENSE = "MIT";

/**
 * Bump when the stamped output changes shape (the header, the URLs) without
 * the item changing, so every item gets a new revision instead of a pinned
 * copy changing under the same name.
 */
export const STAMP_FORMAT = 1;

const NAMESPACE_RE = /^@cortexcn\/(.+)$/;
/** "motion@13" or "@visx/curve@4.0.1-alpha.0"; "@scope/name" alone is not versioned. */
const VERSIONED_RE = /^@?[^@]+@.+$/;
const MAJOR_RE = /\d+/;
const SCRIPT_FILE_RE = /\.[cm]?[jt]sx?$/;
const HEADER_RE =
  /\/\/ Cortexcn item ".*\n\/\/ \S+\n(?:\/\/ Adapted from .*\n)?\n/;
const DIRECTIVE_RE = /^use (?:client|server)$/;
const LEADING_SPACE_RE = /^\s*/;

/** The URL a revision of an item is kept at, unchanged, for good. */
export function pinnedUrl(homepage, name, revision) {
  return `${homepage}/r/v/${name}/${revision}.json`;
}

/**
 * An npm dependency pinned to the major version this workspace builds with:
 * "motion" becomes "motion@13". The bare major has no characters a shell
 * treats specially, so the docs can show it in a copyable install command.
 * Packages on 0.x stay unpinned, because a 0.x range locks the minor version
 * and could downgrade a copy the user already has. Dependencies that already
 * name a version, and ones the workspace does not declare, are left as they are.
 */
export function pinDependency(dependency, declaredVersions) {
  if (VERSIONED_RE.test(dependency)) {
    return dependency;
  }
  const declared = declaredVersions[dependency];
  const major = Number.parseInt(MAJOR_RE.exec(declared ?? "")?.[0] ?? "", 10);
  return major >= 1 ? `${dependency}@${major}` : dependency;
}

/**
 * "@cortexcn/utils" as the URL it is served at, so an item installs from its
 * URL in a project that has not added the @cortexcn registry. Other entries,
 * such as shadcn/ui's own "button", are left for the CLI to resolve.
 */
export function registryDependencyUrl(dependency, homepage) {
  const match = NAMESPACE_RE.exec(dependency);
  return match ? `${homepage}/r/${match[1]}.json` : dependency;
}

export function isScriptFile(file) {
  return SCRIPT_FILE_RE.test(file.target ?? file.path);
}

export function fileHeader({ name, license, revision, homepage, adaptedFrom }) {
  const credit = adaptedFrom
    ? `// Adapted from ${adaptedFrom.name}: ${adaptedFrom.url}\n`
    : "";
  return `// Cortexcn item "${name}", revision ${revision}, ${license} license.\n// ${pinnedUrl(homepage, name, revision)}\n${credit}\n`;
}

export function withoutHeader(content) {
  return content.replace(HEADER_RE, "");
}

function isDirective(statement) {
  return (
    ts.isExpressionStatement(statement) &&
    ts.isStringLiteral(statement.expression) &&
    DIRECTIVE_RE.test(statement.expression.text)
  );
}

/**
 * Where the header goes: after the "use client" directive and the imports.
 * The shadcn CLI drops every comment above a file's first statement, and in
 * projects without React Server Components it removes the directive too, so
 * the comments under it go as well. Below the imports, the header reaches
 * the user's project either way.
 */
function headerOffset(content) {
  const { statements } = ts.createSourceFile(
    "file.tsx",
    content,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX,
  );
  let index = statements.length > 0 && isDirective(statements[0]) ? 1 : 0;
  let end = index === 1 ? statements[0].end : 0;
  while (
    index < statements.length &&
    ts.isImportDeclaration(statements[index])
  ) {
    end = statements[index].end;
    index += 1;
  }
  if (end === 0 && statements.length > 0) {
    end = statements[0].end;
  }
  return end + LEADING_SPACE_RE.exec(content.slice(end))[0].length;
}

/** The header added where it survives the CLI, so `withoutHeader` undoes it exactly. */
export function withHeader(content, header) {
  const offset = headerOffset(content);
  return `${content.slice(0, offset)}${header}${content.slice(offset)}`;
}

export function revisionOf(item) {
  return createHash("sha256")
    .update(`${STAMP_FORMAT}\n${JSON.stringify(item)}`)
    .digest("hex")
    .slice(0, 12);
}

/**
 * Provenance and pinned dependencies for an index entry or a full item,
 * without the revision. Running it on its own output changes nothing.
 */
function stampedFields(item, { homepage, author, declaredVersions }) {
  const { revision: _revision, ...meta } = item.meta ?? {};
  const stamped = { ...item };
  if (item.dependencies) {
    stamped.dependencies = item.dependencies.map((dependency) =>
      pinDependency(dependency, declaredVersions),
    );
  }
  if (item.devDependencies) {
    stamped.devDependencies = item.devDependencies.map((dependency) =>
      pinDependency(dependency, declaredVersions),
    );
  }
  if (item.registryDependencies) {
    stamped.registryDependencies = item.registryDependencies.map((dependency) =>
      registryDependencyUrl(dependency, homepage),
    );
  }
  stamped.author = item.author ?? author;
  stamped.meta = { license: DEFAULT_LICENSE, ...meta };
  return stamped;
}

/**
 * A built registry item, stamped: provenance, pinned dependencies, a revision
 * hashed from all of that and the file contents, and a header on each script
 * file naming the item, its license, and the revision.
 */
export function stampItem(item, options) {
  const stamped = stampedFields(item, options);
  if (item.files) {
    stamped.files = item.files.map((file) =>
      typeof file.content === "string"
        ? { ...file, content: withoutHeader(file.content) }
        : file,
    );
  }

  const revision = revisionOf(stamped);
  const { license, adaptedFrom } = stamped.meta;
  const header = fileHeader({
    name: item.name,
    license,
    revision,
    homepage: options.homepage,
    adaptedFrom,
  });

  return {
    ...stamped,
    files: stamped.files?.map((file) =>
      typeof file.content === "string" && isScriptFile(file)
        ? { ...file, content: withHeader(file.content, header) }
        : file,
    ),
    meta: { ...stamped.meta, revision },
  };
}

/** A registry.json entry, stamped to match its item file. */
export function stampIndexEntry(entry, revision, options) {
  const stamped = stampedFields(entry, options);
  return { ...stamped, meta: { ...stamped.meta, revision } };
}
