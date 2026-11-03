import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  pinDependency,
  registryDependencyUrl,
  stampItem,
} from "../registry-stamp.mjs";

const homepage = "https://ui.cortexcn.dev";
const REVISION_RE = /^[0-9a-f]{12}$/;
const ADAPTED_HEADER_RE =
  /Apache-2\.0 license\.\n\/\/ \S+\n\/\/ Adapted from AI Elements: https:\/\/elements\.ai-sdk\.dev\n\nexport/;
const options = {
  homepage,
  author: `Cortexcn (${homepage})`,
  declaredVersions: {
    motion: "^13.4.4",
    "@react-three/fiber": "^9.8.1",
    three: "^0.186.1",
  },
};

const item = {
  name: "lanyard",
  type: "registry:component",
  dependencies: ["motion", "three", "@visx/curve@4.0.1-alpha.0"],
  registryDependencies: ["@cortexcn/utils", "button"],
  files: [
    {
      path: "src/components/lanyard.tsx",
      type: "registry:component",
      target: "components/lanyard.tsx",
      content:
        '"use client";\n\nimport { motion } from "motion/react";\n\nexport function Lanyard() {}\n',
    },
    {
      path: "src/agents/SKILL.md",
      type: "registry:file",
      target: "~/SKILL.md",
      content: "---\nname: cortexcn\n---\n",
    },
  ],
};

describe("pinDependency", () => {
  it("pins a package to the major version the workspace declares", () => {
    assert.equal(
      pinDependency("motion", options.declaredVersions),
      "motion@13",
    );
    assert.equal(
      pinDependency("@react-three/fiber", options.declaredVersions),
      "@react-three/fiber@9",
    );
  });

  it("leaves 0.x, undeclared, and already versioned packages alone", () => {
    assert.equal(pinDependency("three", options.declaredVersions), "three");
    assert.equal(
      pinDependency("left-pad", options.declaredVersions),
      "left-pad",
    );
    assert.equal(
      pinDependency("@visx/curve@4.0.1-alpha.0", options.declaredVersions),
      "@visx/curve@4.0.1-alpha.0",
    );
  });
});

describe("registryDependencyUrl", () => {
  it("turns @cortexcn items into URLs and leaves shadcn/ui items by name", () => {
    assert.equal(
      registryDependencyUrl("@cortexcn/utils", homepage),
      "https://ui.cortexcn.dev/r/utils.json",
    );
    assert.equal(registryDependencyUrl("button", homepage), "button");
  });
});

describe("stampItem", () => {
  const stamped = stampItem(item, options);
  const revision = stamped.meta.revision;

  it("records the author, an MIT license by default, and a revision", () => {
    assert.equal(stamped.author, "Cortexcn (https://ui.cortexcn.dev)");
    assert.equal(stamped.meta.license, "MIT");
    assert.match(revision, REVISION_RE);
  });

  it("keeps a license the item declares, and credits its source", () => {
    const adapted = stampItem(
      {
        ...item,
        meta: {
          license: "Apache-2.0",
          adaptedFrom: {
            name: "AI Elements",
            url: "https://elements.ai-sdk.dev",
          },
        },
      },
      options,
    );
    assert.equal(adapted.meta.license, "Apache-2.0");
    assert.match(adapted.files[0].content, ADAPTED_HEADER_RE);
    assert.deepEqual(stampItem(adapted, options), adapted);
  });

  it("puts the header on script files only, below the directive and imports", () => {
    // The shadcn CLI drops comments above a file's first statement, and the
    // directive with the comments under it when the project has no RSC.
    assert.equal(
      stamped.files[0].content,
      `"use client";\n\nimport { motion } from "motion/react";\n\n// Cortexcn item "lanyard", revision ${revision}, MIT license.\n// https://ui.cortexcn.dev/r/v/lanyard/${revision}.json\n\nexport function Lanyard() {}\n`,
    );
    assert.equal(stamped.files[1].content, item.files[1].content);
  });

  it("puts the header below the imports when there is no directive", () => {
    const utils = stampItem(
      {
        name: "utils",
        type: "registry:lib",
        files: [
          {
            path: "src/lib/utils.ts",
            type: "registry:lib",
            target: "lib/utils.ts",
            content:
              'import {\n  clsx,\n} from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport const cn = () => {};\n',
          },
        ],
      },
      options,
    );
    const { revision: utilsRevision } = utils.meta;
    assert.equal(
      utils.files[0].content,
      `import {\n  clsx,\n} from "clsx";\nimport { twMerge } from "tailwind-merge";\n\n// Cortexcn item "utils", revision ${utilsRevision}, MIT license.\n// https://ui.cortexcn.dev/r/v/utils/${utilsRevision}.json\n\nexport const cn = () => {};\n`,
    );
  });

  it("is unchanged when stamped again", () => {
    assert.deepEqual(stampItem(stamped, options), stamped);
  });

  it("gets a new revision when a file changes", () => {
    const changed = structuredClone(item);
    changed.files[0].content += "// changed\n";
    assert.notEqual(stampItem(changed, options).meta.revision, revision);
  });
});
