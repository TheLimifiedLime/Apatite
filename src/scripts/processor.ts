import { Schedule } from "../schema/schedule";
import { schedules } from "./fetcher";

/**
 * Filters the schedules based on their date range validity.
 *
 * This function iterates over the list of schedules and applies the following filters:
 * - If the schedule does not have a valid date range, it is included.
 * - If the schedule has a start date and it is in the future, it is excluded.
 * - If the schedule has an end date and it is in the past, it is excluded.
 *
 * @returns {Schedule[]} The filtered list of schedules.
 */
function dateRangeFilter(): Schedule[] {
  return schedules.filter((schedule: Schedule) => {
    if (!schedule.dateRangeValid) return true;

    // Assign variables only if the dates exist
    const startDate = schedule.dateRangeValid.start
      ? new Date(schedule.dateRangeValid.start + "T00:00:00")
      : null;
    const endDate = schedule.dateRangeValid.end
      ? new Date(schedule.dateRangeValid?.end + "T00:00:00")
      : null;

    // Filter out schedules that have not started yet
    if (startDate && startDate > new Date()) return false;

    // Filter out schedules that have ended
    if (endDate && endDate < new Date()) return false;

    return true;
  });
}
