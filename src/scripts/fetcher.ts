import z from "zod";
import ScheduleSchema from "../schema/schedule";
import ConfigSchema from "../schema/config";

const urlParameters = new URLSearchParams(window.location.search);

function fetchSchedules(): (typeof ScheduleSchema)[] | [] {
  // Get value of "schedules" query parameter
  const schedulesParameter = urlParameters.get("schedules");
  if (!schedulesParameter) {
    console.error("Unable to find schedules in URL.");
    return [];
  }

  // URL Decode and parse the schedules parameter + validate data type
  let parsedSchedules;
  try {
    parsedSchedules = decodeURIComponent(schedulesParameter);
    parsedSchedules = JSON.parse(parsedSchedules);
  } catch (error) {
    console.error("Failed to parse schedules.", error);
    return [];
  }

  if (!Array.isArray(parsedSchedules)) {
    console.error("Unable to find any schedules.");
    return [];
  }

  // Validate each schedule item against the schema and then filter out invalid items
  parsedSchedules = parsedSchedules
    .map((scheduleItem) => {
      try {
        return ScheduleSchema.parse(scheduleItem);
      } catch (error) {
        console.error("Invalid schedule provided.", error);
        return [];
      }
    })
    .filter((scheduleItem) => scheduleItem !== undefined);

  return parsedSchedules;
}

function fetchConfig(): z.infer<typeof ConfigSchema> | undefined {
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

const schedules = fetchSchedules();
const config = fetchConfig();

export { schedules, config };
