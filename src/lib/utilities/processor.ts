import type { Schedule, ScheduleItem } from "$lib/schema/schedule";

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

function calculateScheduleItem(schedules: Schedule[]): ScheduleItem | null {
  // Sort schedules by priority and return the first one
  const prioritizedSchedule = schedules.sort((a, b) => {
    return b.priority - a.priority;
  })[0];

  // Filter out items that haven't started or ended yet
  const validScheduleItems = prioritizedSchedule.items.filter((item) => {
    const { startTime: start, endTime: end } = item;
    const now = new Date();

    // Filter out items that haven't started or ended yet
    if (now < start) return false;
    if (now > end) return false;

    return true;
  });

  // Warn if there are multiple valid schedule items for the current time
  if (validScheduleItems.length > 1) {
    console.warn(
      "Conflicting schedule items valid for the current time. This is not recommended. Using the first one."
    );
  }

  return validScheduleItems.length > 0 ? validScheduleItems[0] : null;
}

function calculateFallbackSchedule(schedules: Schedule[]): Schedule | null {
  // Filter out schedules that can't be used as fallbacks
  const fallbackEnabledSchedules = schedules.filter(
    (schedule) => schedule.fallback
  );
  if (fallbackEnabledSchedules.length === 0) return null;

  if (fallbackEnabledSchedules.length > 1) {
    // TODO: Add UI toast notification
    console.warn("Multiple fallback schedules found. This is not recommended");
  }

  // Sort fallback enabled schedules by priority and return the first one
  return fallbackEnabledSchedules.sort((a, b) => {
    return b.priority - a.priority;
  })[0];
}

export { filter, calculateScheduleItem, calculateFallbackSchedule };
