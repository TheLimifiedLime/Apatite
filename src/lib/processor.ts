import { Schedule } from "../schema/schedule";
import { schedules } from "./fetcher";

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

function reoccurrenceFilter(): Schedule[] {
  return schedules.filter((schedule: Schedule) => {
    if (!schedule.reoccurrence) return true;

    // Check if the current date matches the reoccurrence pattern
    switch (schedule.reoccurrence.type) {
      case "weekly":
        return schedule.reoccurrence.value.includes(new Date().getDay());
      case "monthly":
        return schedule.reoccurrence.value.includes(new Date().getDate());
      case "annually":
        return schedule.reoccurrence.value.includes(
          Math.floor(
            (new Date().getTime() -
              new Date(new Date().getFullYear(), 0, 0).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        );
    }
  });
}
