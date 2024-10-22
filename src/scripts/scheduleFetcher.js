const eventSchedules = [];
const weekRepeatSchedules = [];
let schedule;

// Sort schedules into their array by "event" or "weekRepeatSchedules" type
schedules.forEach((scheduleItem) => {
  if (scheduleItem.type === "event") {
    eventSchedules.push(scheduleItem);
  }

  if (scheduleItem.type === "weekRepeat") {
    weekRepeatSchedules.push(scheduleItem);
  }
});

//  Define schedule handlers for each type
const eventScheduleHandler = () => {
  /* 
    Define a date variable to use for comparison
    Then rewrites the variable with the sets the year, month, and date to be consistent consistent with the date format in the schedules
  */
  let currentDate = new Date();
  currentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Make an array for all valid schedules
  let eventSchedule = [];
  /*
    Calculate the difference between the eventDate and today
    If this is 0 then they match and we push it into the eventSchedule array
    NOTE: Direct comparisson of both dates doesn't work so we use the difference instead
  */
  eventSchedules.forEach((scheduleItem) => {
    if (currentDate - scheduleItem.dateValid === 0)
      eventSchedule.push(scheduleItem);
  });

  // Here we validate to see if there if more or less than one event schedule for today and act accordingly
  if (eventSchedule.length > 1) {
    // Call the fallback handler to handle the problem
    fallbackHandler(
      "Multiple event schedules have been specified for this date. Verify that you don't have more than one event schedule on the same day."
    );
  } else if (eventSchedule.length < 1) {
    /*
      Since there are no valid event schedules check if there are any weekRepeatSchedules
      If so call that handler, otherwise fallback
    */
    if (weekRepeatSchedules.length > 0) {
      weekRepeatScheduleHandler();
    } else {
      fallbackHandler(null);
    }
  } else {
    // Otherwise set the schedule variable to the first (and only) item in the eventSchedule array
    schedule = eventSchedule[0];
  }
};

const weekRepeatScheduleHandler = () => {
  //  Make an array for all valid schedules
  let weekRepeatSchedule = [];

  // Check if a schedule is valid for today
  weekRepeatSchedules.forEach((scheduleItem) => {
    if (scheduleItem.daysValid.includes(new Date().getDay())) {
      weekRepeatSchedule.push(scheduleItem);
    }
  });

  // Here we validate to see if there if more than one event schedule for today and act accordingly
  if (weekRepeatSchedule.length > 1) {
    // // Set the schedule var to mark a fallback occured
    fallbackHandler(
      "Multiple repeating schedules have been specified for this date. Verify that you don't have more than one repeating schedule on the same day."
    );
    // Call the fallback handler to handle the problem
  } else if (weekRepeatSchedule.length < 1) {
    fallbackHandler(null);
  } else {
    // Otherwise set the schedule variable to the first (and only) item in the eventSchedule array
    schedule = weekRepeatSchedule[0];
  }
};

/*
  Look for eventSchedules to call
  Otherwise move down to weekRepeatSchedules then the fallbackHandler
*/
if (eventSchedules.length > 0) {
  eventScheduleHandler();
} else if (weekRepeatSchedules.length > 0) {
  weekRepeatScheduleHandler();
} else {
  fallbackHandler(
    "No schedules have been found. Make sure your schedules are defined correctly in the schedules.js file."
  );
}
