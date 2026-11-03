import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { STATUS_PAGE } from "../site-config";
import { getSystemState } from "../system-status";
import { isSystemState, systemState } from "../system-status-state";

describe("systemState", () => {
  it("is operational when every active monitor is up", () => {
    assert.equal(systemState(["up", "up", "paused"]), "operational");
  });

  it("is a partial outage when some are down or degraded", () => {
    assert.equal(systemState(["up", "down"]), "partial-outage");
    assert.equal(systemState(["up", "validating"]), "partial-outage");
    assert.equal(systemState(["up", "maintenance"]), "partial-outage");
  });

  it("is a major outage when every active monitor is down", () => {
    assert.equal(systemState(["down", "down", "paused"]), "major-outage");
  });

  it("is null when nothing can be verified", () => {
    assert.equal(systemState([]), null);
    assert.equal(systemState(["paused"]), null);
    assert.equal(systemState(["up", "pending"]), null);
    assert.equal(systemState(["up", "sleeping"]), null);
    assert.equal(systemState(["up", 1]), null);
  });

  it("only accepts the three states from /api/status", () => {
    assert.equal(isSystemState("operational"), true);
    assert.equal(isSystemState("toString"), false);
    assert.equal(isSystemState(null), false);
  });
});

describe("getSystemState", () => {
  const realFetch = globalThis.fetch;
  const realToken = process.env.BETTERSTACK_API_TOKEN;

  const resources = {
    data: [
      { attributes: { resource_type: "Monitor", resource_id: 1 } },
      { attributes: { resource_type: "Monitor", resource_id: 2 } },
    ],
    pagination: { next: null },
  };

  function respondWith(monitors: unknown, status = 200) {
    globalThis.fetch = ((input: RequestInfo | URL) => {
      const url = String(input);
      const body = url.includes(`/status-pages/${STATUS_PAGE.betterStackId}/`)
        ? resources
        : monitors;
      return Promise.resolve(new Response(JSON.stringify(body), { status }));
    }) as typeof fetch;
  }

  beforeEach(() => {
    process.env.BETTERSTACK_API_TOKEN = "test-token";
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
    process.env.BETTERSTACK_API_TOKEN = realToken;
  });

  it("reads the state of the monitors on the status page", async () => {
    respondWith({
      data: [
        { id: "1", attributes: { status: "up" } },
        { id: "2", attributes: { status: "down" } },
        { id: "3", attributes: { status: "down" } },
      ],
    });
    assert.equal(await getSystemState(), "partial-outage");
  });

  it("is null without a token", async () => {
    process.env.BETTERSTACK_API_TOKEN = "";
    respondWith({ data: [] });
    assert.equal(await getSystemState(), null);
  });

  it("is null when the API fails or answers unexpectedly", async () => {
    respondWith({ error: "Unauthorized" }, 401);
    assert.equal(await getSystemState(), null);

    respondWith({ monitors: [] });
    assert.equal(await getSystemState(), null);

    globalThis.fetch = (() =>
      Promise.reject(new Error("offline"))) as typeof fetch;
    assert.equal(await getSystemState(), null);
  });

  it("is null when a monitor on the page is missing from the list", async () => {
    respondWith({ data: [{ id: "1", attributes: { status: "up" } }] });
    assert.equal(await getSystemState(), null);
  });
});
