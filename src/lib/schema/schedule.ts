import z from "zod";

const ScheduleSchema = z.object({
  name: z
    .string()
    .default("Unnamed Schedule")
    .describe("Schedule name for use in the UI."),
  priority: z
    .number()
    .int()
    .nonnegative()
    .finite()
    .default(0)
    .describe("Priority to use when conflicting schedules exist."),
  fallback: z
    .boolean()
    .describe(
      "Whether or not to use this schedule as a fallback. When more than one exists, the priority is used to make a selection."
    )
    .default(false),
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
    .describe("The date range during which the schedule is valid.")
    .optional(),
  reoccurrence: z
    .object({
      type: z
        .enum(["weekly", "monthly", "annually"])
        .describe(
          "Type of reoccurrence, whether daily (select days of week), monthly (select days of month), or yearly (select days of the year)"
        ),
      value: z
        .array(z.number().int().nonnegative())
        .describe("Specifies the zero indexed value for the reoccurrence"),
    })
    .describe("The reoccurrence pattern in which the schedule is valid.")
    .optional(),
  items: z
    .object({
      name: z.string().optional().describe("A name to display for the item."),
      description: z
        .string()
        .optional()
        .describe("A description for item to display."),
      enabled: z
        .boolean()
        .default(true)
        .describe(
          "Used to disable specific items. They are still shown but in a disabled state."
        ),
      startTime: z
        .string()
        .time()
        .transform((time) => {
          return new Date(`${new Date().toDateString()} ${time}`);
        })
        .describe("When the time range of the item starts."),
      endTime: z
        .string()
        .time()
        .transform((time) => {
          return new Date(`${new Date().toDateString()} ${time}`);
        })
        .describe("When the time range of the item ends."),
      url: z
        .string()
        .url()
        .describe("URL to redirect to when the item is triggered."),
    })
    .array()
    .nonempty()
    .describe(
      "Items to processes and used to determine which link to open. When used as a fallback, these are listed in order."
    ),
});

export { ScheduleSchema };

export type Schedule = z.infer<typeof ScheduleSchema>;
export type ScheduleItem = z.infer<typeof ScheduleSchema>["items"][0];
