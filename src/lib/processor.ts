import type { Schedule } from "$lib/schema/schedule";

function filter(schedules: Schedule[]): Schedule[] | null {
  let filteredSchedules;
  // Filter out schedules if the current date is not within the date range
  filteredSchedules = schedules.filter((schedule: Schedule) => {
    if (!schedule.dateRangeValid) return true;

    const { start: startDate, end: endDate } = schedule.dateRangeValid;

    // Filter out schedules that have not started yet or that have ended
    if (startDate && startDate > new Date()) return false;
    if (endDate && endDate < new Date()) return false;

    return true;
  });

  // Filter out schedules if the current date does not match the reoccurrence pattern
  filteredSchedules = schedules.filter((schedule: Schedule) => {
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

  return filteredSchedules.length > 0 ? filteredSchedules : null;
}

export { filter };
