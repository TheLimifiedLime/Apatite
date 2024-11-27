import { ScheduleSchema, type Schedule } from "$lib/schema/schedule";
import { ConfigSchema, type Config } from "$lib/schema/config";

function fetchConfig(urlParameters: URLSearchParams): Config | null {
  const configParameter = urlParameters.get("config");

  if (!configParameter) return ConfigSchema.parse({});

  let parsedConfig;

  // URL Decode and parse the config parameter + validate data type
  try {
    parsedConfig = decodeURIComponent(configParameter);
    parsedConfig = JSON.parse(parsedConfig);
  } catch (error) {
    console.error("Failed to parse config.", error);
    return null;
  }

  // Validate the config against the schema
  try {
    return ConfigSchema.parse(parsedConfig);
  } catch (error) {
    console.error("Invalid config provided.", error);
    return null;
  }
}

function fetchSchedules(urlParameters: URLSearchParams): Schedule[] | null {
  // Get value of "schedules" query parameter
  const schedulesParameter = urlParameters.get("schedules");
  if (!schedulesParameter) {
    console.error("Unable to find schedules in URL.");
    return null;
  }

  // URL Decode and parse the schedules parameter + validate data type
  let parsedSchedules;
  try {
    parsedSchedules = decodeURIComponent(schedulesParameter);
    parsedSchedules = JSON.parse(parsedSchedules);
  } catch (error) {
    console.error("Failed to parse schedules.", error);
    return null;
  }

  if (!Array.isArray(parsedSchedules)) {
    console.error("Unable to find any schedules.");
    return null;
  }

  // Validate each schedule item against the schema and then filter out invalid items
  parsedSchedules = parsedSchedules
    .map((scheduleEntry) => {
      try {
        return ScheduleSchema.parse(scheduleEntry);
      } catch (error) {
        console.error("Invalid schedule provided.", error);
        return null;
      }
    })
    .filter(
      (scheduleItem): scheduleItem is Schedule => scheduleItem !== undefined
    );

  return parsedSchedules.length > 0 ? parsedSchedules : null;
}

export { fetchConfig, fetchSchedules };
