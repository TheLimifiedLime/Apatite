import z from "zod";

const ScheduleSchema = z.object({
  name: z
    .string()
    .describe("Schedule name for use in the UI.")
    .default("Unnamed Schedule")
    .optional(),
  dateRangeValid: z
    .object({
      start: z.string().describe("A starting date.").date().optional(),
      end: z.string().describe("A ending date.").date().optional(),
    })
    .describe(
      "The date range during which the schedule is valid. If not provided, the schedule is assumed to be always valid."
    )
    .optional(),
  reoccurance: z
    .object({
      type: z
        .enum(["daily", "monthly", "yearly"])
        .describe(
          "Type of reoccurrence, whether daily (select days of week), monthly (select days of month), or yearly (select days of the year)"
        ),
      value: z
        .array(z.number().nonnegative())
        .describe("Specifies the zero indexed value for the reoccurrence"),
    })
    .describe(
      "The frequency of schedule repetition. For example, a schedule can be set to repeat only on weekdays (Monday to Friday)."
    )
    .optional(),
  items: z
    .array(
      z.object({
        friendlyName: z.string().optional(),
        startTime: z.string().time(),
        endTime: z.string().time(),
      })
    )
    .describe(
      "Items to processes and used to determine which link to open. When used as a fallback, these are listed in order."
    )
    .nonempty(),
});

export default ScheduleSchema;
