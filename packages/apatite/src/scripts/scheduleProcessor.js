const scheduleProcessor = () => {
  let currentPeriod = undefined;
  let futurePeriods = [];
  // Calculate periods not passed/in the future
  schedule.schedule.forEach((period) => {
    const dif = period.endTime - new Date();
    if (dif > 0) {
      futurePeriods.push(period);
    }
  });

  // Go through the previous results and filter out periods not passed leaving the current period
  futurePeriods.forEach((period) => {
    const dif = period.startTime - new Date();
    if (dif < 0) {
      currentPeriod = period;
    }
  });

  // Open URL if a period is provided otherwise call the fallback handler
  if (currentPeriod && currentPeriod.url) {
    window.location.href = currentPeriod.url;
  } else {
    fallbackHandler(null);
  }
};

if (schedule) scheduleProcessor();
