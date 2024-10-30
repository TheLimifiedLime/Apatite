import { Schedule } from "../schema/schedule";
import { schedules } from "./fetcher";

// Function to print date range for all schedules if available
function printDateRanges() {
  schedules.forEach((schedule: Schedule) => {
    if (schedule.dateRangeValid) {
      const { start, end } = schedule.dateRangeValid;
      console.log(`Start Date: ${start}, End Date: ${end}`);
    } else {
      console.log("No date range available.");
    }
  });
}

// Call the function to print date ranges for all schedules
printDateRanges();
