import type { PageLoad } from "./$types";
import { fetchConfig, fetchSchedules } from "$lib/fetcher";

export const load: PageLoad = ({ url }) => {
  const config = fetchConfig(url.searchParams);
  const schedules = fetchSchedules(url.searchParams);

  return {
    config: config,
    schedules: schedules,
  };
};
