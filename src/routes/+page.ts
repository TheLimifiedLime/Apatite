import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { fetchConfig, fetchSchedules } from "$lib/utilities/fetcher";
import {
  filter,
  calculateScheduleItem,
  calculateFallbackSchedule,
} from "$lib/utilities/processor";

export const load: PageLoad = ({ url }) => {
  const config = fetchConfig(url.searchParams);
  const schedules = fetchSchedules(url.searchParams);

  if (!schedules) return { config: config, fallback: null };

  // Filter schedules
  const filteredSchedules = filter(schedules);
  if (!filteredSchedules)
    return {
      config: config,
      fallback: calculateFallbackSchedule(schedules),
    };

  // Get the schedule item to redirect to
  const scheduleItem = calculateScheduleItem(filteredSchedules);
  if (!scheduleItem || !config?.autoRedirect)
    return { config: config, fallback: calculateFallbackSchedule(schedules) };

  // Redirect to the schedule item's URL
  redirect(302, scheduleItem.url);
};
