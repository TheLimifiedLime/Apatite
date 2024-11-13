import { ScheduleSchema, type Schedule } from "$lib/schema/schedule";
import { ConfigSchema, type Config } from "$lib/schema/config";

/**
 * Fetches and validates the config from the URL parameters.
 * @returns {Config | undefined} The config object passed to Apatite.
 */
function fetchConfig(urlParameters: URLSearchParams): Config | undefined {
  const configParameter = urlParameters.get("config");

  if (!configParameter) return;

  let parsedConfig;

  // URL Decode and parse the config parameter + validate data type
  try {
    parsedConfig = decodeURIComponent(configParameter);
    parsedConfig = JSON.parse(parsedConfig);
  } catch (error) {
    console.error("Failed to parse config.", error);
    return;
  }

  // Validate the config against the schema
  try {
    return ConfigSchema.parse(parsedConfig);
  } catch (error) {
    console.error("Invalid config provided.", error);
    return;
  }
}

/**
 * Fetches and validates schedules from the URL parameters.
 * @returns {Schedule[] | undefined} An array of schedules passed to Apatite or undefined if no schedules are found.
 */
function fetchSchedules(urlParameters: URLSearchParams): Schedule[] | undefined {
  // Get value of "schedules" query parameter
  const schedulesParameter = urlParameters.get("schedules");
  if (!schedulesParameter) {
    console.error("Unable to find schedules in URL.");
    return undefined;
  }

  // URL Decode and parse the schedules parameter + validate data type
  let parsedSchedules;
  try {
    parsedSchedules = decodeURIComponent(schedulesParameter);
    parsedSchedules = JSON.parse(parsedSchedules);
  } catch (error) {
    console.error("Failed to parse schedules.", error);
    return undefined;
  }

  if (!Array.isArray(parsedSchedules)) {
    console.error("Unable to find any schedules.");
    return undefined;
  }

  // Validate each schedule item against the schema and then filter out invalid items
  parsedSchedules = parsedSchedules
    .map((scheduleEntry) => {
      try {
        return ScheduleSchema.parse(scheduleEntry);
      } catch (error) {
        console.error("Invalid schedule provided.", error);
        return undefined;
      }
    })
    .filter(
      (scheduleItem): scheduleItem is Schedule => scheduleItem !== undefined
    );

  return parsedSchedules.length > 0 ? parsedSchedules : undefined;
}

export { fetchConfig, fetchSchedules };
