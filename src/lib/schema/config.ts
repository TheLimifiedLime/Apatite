import z from "zod";

const ConfigSchema = z
  .object({
    autoRedirect: z
      .boolean()
      .default(true)
      .describe(
        "Whether to redirect to a schedule item link. If false, a fallback will be forced."
      ),
    redirectItem: z
      .string()
      .optional()
      .describe(
        "The name of a schedule item to redirect to. Useful for creating a link to a specific schedule item."
      ),
  })
  .describe("Settings for customizing the Apatite.")
  .optional();

export { ConfigSchema };
export type Config = z.infer<typeof ConfigSchema>;
