import { describe, expect, expectTypeOf, it } from "vitest";
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
    // TODO: have default config so null is not expected
    expectTypeOf(fetchConfig(mock)).toMatchTypeOf<Config | null>();
  });

  it("fails to parse the config parameter", () => {
    const data = {
      autoRedirect: "yes",
    };

    const mock = new URLSearchParams({
      config: `break-the${encodeURIComponent(JSON.stringify(data))}config`,
    });

    expect(fetchConfig(mock)).toBeNull();
  });

  it("provides a config when an empty object is passed", () => {
    const data = {};
    const mock = new URLSearchParams({
      config: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchConfig(mock)).toStrictEqual(ConfigSchema.parse({}));
    // TODO: have default config so null is not expected
    expectTypeOf(fetchConfig(mock)).toMatchTypeOf<Config | null>();
  });

  it("provides a default config when config url parameter is absent", () => {
    const mock = new URLSearchParams();

    expect(fetchConfig(mock)).toStrictEqual(ConfigSchema.parse({}));
    // TODO: have default config so null is not expected
    expectTypeOf(fetchConfig(mock)).toMatchTypeOf<Config | null>();
  });

  it("parses a config error", () => {
    const data = {
      autoRedirect: "yes",
    };

    const mock = new URLSearchParams({
      config: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchConfig(mock)).toBeNull();
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
    expectTypeOf(fetchSchedules(mock)).toMatchTypeOf<Schedule[] | null>();
  });

  it("fails to parse the schedules parameter", () => {
    const data = fixDates(
      Array.from({ length: 5 }, () => generateMock(ScheduleSchema))
    );

    const mock = new URLSearchParams({
      schedules: `break-the${encodeURIComponent(JSON.stringify(data))}config`,
    });

    expect(fetchSchedules(mock)).toBeNull();
  });

  it("fails to parse an array type schedules parameter", () => {
    let data: any = fixDates(
      Array.from({ length: 5 }, () => generateMock(ScheduleSchema))
    );
    // Purposely change the data from an array to an object
    data = {
      schedules: data,
    };

    const mock = new URLSearchParams({
      schedules: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchSchedules(mock)).toBeNull();
  });

  it("provides an error when schedule url parameter is absent", () => {
    const mock = new URLSearchParams();

    expect(fetchSchedules(mock)).toBeNull();
  });

  it("ends with no schedules after checks", () => {
    const data = fixDates(
      Array.from({ length: 1 }, () => generateMock(ScheduleSchema))
    );
    // Purposefully break the first schedule
    data[0].fallback = "maybe" as unknown as boolean;

    const mock = new URLSearchParams({
      schedules: encodeURIComponent(JSON.stringify(data)),
    });

    expect(fetchSchedules(mock)).toBeNull();
  });

  it("parses a config error", () => {
    const data = fixDates(
      Array.from({ length: 5 }, () => generateMock(ScheduleSchema))
    );
    // Purposefully break the first schedule
    data[0].fallback = "maybe" as unknown as boolean;

    const mock = new URLSearchParams({
      schedules: encodeURIComponent(JSON.stringify(data)),
    });

    const expectedData = data
      .map((schedule, index) => {
        // Set the first schedule to null (expected for a broken schedule)
        if (index === 0) {
          return null;
        }
        return ScheduleSchema.parse(schedule);
      })
      .filter((schedule) => schedule !== null);

    expect(fetchSchedules(mock)).toStrictEqual(expectedData);
  });
});
