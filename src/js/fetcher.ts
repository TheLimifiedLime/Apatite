import ScheduleSchema from "../schema/schedule";

function fetchSchedules() {
  let parsedSchedules;
  const schedulesParameter = new URLSearchParams(window.location.search).get(
    "schedules"
  );

  if (!schedulesParameter) {
    console.error("Unable to find schedules query parameter");
    return;
  }

  parsedSchedules = decodeURIComponent(schedulesParameter);
  try {
    parsedSchedules = JSON.parse(parsedSchedules);
  } catch (error) {
    console.error("Failed to parse schedules.", error);
    return;
  }

  if (!parsedSchedules || !Array.isArray(parsedSchedules)) {
    console.error("Unable to find any schedules.");
    return;
  }

  parsedSchedules = parsedSchedules.map((scheduleItem) => {
    try {
      return ScheduleSchema.parse(scheduleItem);
    } catch (error) {
      console.error("Invalid schedule provided.", error);
      return;
    }
  });
    
    return parsedSchedules;
}

