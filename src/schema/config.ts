import z from "zod";

const ConfigSchema = z
  .object({
    version: z.string(),
    forceTheme: z
      .enum(["light", "dark"])
      .describe("Force override the theme used while in fallback mode")
      .optional(),
  })
  .describe("Customize the settings for customizing the Apatite instance.");

  export default ConfigSchema;