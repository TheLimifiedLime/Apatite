import { describe, expect, it } from "vitest";
import { ConfigSchema, type Config } from "$lib/schema/config";
import type { Schedule } from "$lib/schema/schedule";
import { fetchConfig, fetchSchedules } from "./fetcher";

describe("fetch config", () => {
  // * INFO: Mocking could be done with a zod mocking library
  // * but none seem to handle z.string.date() correctly at this time

  it("parses the config correctly", () => {
    const data: Config = {
      autoRedirect: false,
    };

    const mock = new URLSearchParams({
      config: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchConfig(mock)).toStrictEqual(data);
  });

  it("provides a config when an empty object is passed", () => {
    const data = {};
    const mock = new URLSearchParams({
      config: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchConfig(mock)).toStrictEqual(ConfigSchema.parse({}));
  });

  it("provides a config with default values when config url parameters are absent", () => {
    const mock = new URLSearchParams();

    expect(fetchConfig(mock)).toStrictEqual(ConfigSchema.parse({}));
  });

  it("parses a config error", () => {
    const data = {
      autoRedirect: "yes",
    };

    const mock = new URLSearchParams({
      config: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchConfig(mock)).toStrictEqual(null);
  });
});
