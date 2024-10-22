import z from "zod";

const ConfigSchema = z
  .object({
    forceTheme: z
      .enum(["light", "dark"])
      .describe("Force override the theme used while in fallback mode")
      .optional(),
  })
  .describe("Customize the settings for customizing the Apatite instance.")
  .optional();

export default ConfigSchema;
