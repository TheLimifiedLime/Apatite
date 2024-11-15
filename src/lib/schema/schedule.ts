import z from "zod";

const ScheduleSchema = z.object({
  name: z
    .string()
    .describe("Schedule name for use in the UI.")
    .default("Unnamed Schedule")
    .optional(),
  dateRangeValid: z
    .object({
      start: z
        .string()
        .describe("A starting date.")
        .date()
        .transform((string) => {
          return new Date(string + "T00:00:00");
        })
        .optional(),
      end: z
        .string()
        .describe("A ending date.")
        .date()
        .transform((string) => {
          return new Date(string + "T00:00:00");
        })
        .optional(),
    })
    .describe(
      "The date range during which the schedule is valid. If not provided, the schedule is assumed to be always valid."
    )
    .optional(),
  reoccurrence: z
    .object({
      type: z
        .enum(["weekly", "monthly", "annually"])
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
        description: z.string().optional(),
        startTime: z
          .string()
          .time()
          .transform((time) => {
            return new Date(time);
          }),
        endTime: z
          .string()
          .time()
          .transform((time) => {
            return new Date(time);
          }),
        url: z.string().url(),
      })
    )
    .describe(
      "Items to processes and used to determine which link to open. When used as a fallback, these are listed in order."
    )
    .nonempty(),
});

export { ScheduleSchema };
export type Schedule = z.infer<typeof ScheduleSchema>;
