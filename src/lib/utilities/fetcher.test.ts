import { describe, expect, it } from "vitest";
import { ConfigSchema, type Config } from "$lib/schema/config";
import { ScheduleSchema, type Schedule } from "$lib/schema/schedule";
import { fetchConfig, fetchSchedules } from "./fetcher";
import { generateMock } from "@anatine/zod-mock";

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

describe("fetch schedules", () => {
  function fixDates(schedules: Schedule[]) {
    /*
     * INFO: This is a work around to the zod mocking library not mocking z.string.date() correctly
     * The expected mock in the "2024-10-01" format isn't returned. See:
     * https://github.com/anatine/zod-plugins/issues/213
     * https://github.com/anatine/zod-plugins/issues/234
     */
    return schedules.map((schedule) => {
      if (schedule.dateRangeValid) {
        schedule.dateRangeValid.start = "2024-10-01" as unknown as Date;
        schedule.dateRangeValid.end = "2024-11-01" as unknown as Date;
      }

      if (schedule.items.length > 0) {
        schedule.items.forEach((item) => {
          item.startTime = "13:00:00" as unknown as Date;
          item.endTime = "15:30:00" as unknown as Date;
        });
      }

      return schedule;
    });
  }

  it("parses the schedules correctly", () => {
    const data = fixDates(
      Array.from({ length: 5 }, () => generateMock(ScheduleSchema))
    );

    const mock = new URLSearchParams({
      schedules: encodeURIComponent(JSON.stringify(data)),
    });

    const expectedData = data.map((schedule) => ScheduleSchema.parse(schedule));

    expect(fetchSchedules(mock)).toStrictEqual(expectedData);
  });
});
