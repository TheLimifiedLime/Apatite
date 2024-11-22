import z from "zod";

const ConfigSchema = z
  .object({})
  .describe("Settings for customizing the Apatite.")
  .optional();

export { ConfigSchema };
export type Config = z.infer<typeof ConfigSchema>;
