const errorToastDisplay = (message) => {
  /*
    Here we use a normal system alert to show the error message instead of a custom solution
    This makes it simpler to implement and is worth the tradeoff of not being able to use styling
    For the future the Popover API may be worth considering when browser support becomes more widespread:
    https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
  */
  alert(message);
};

const noFallbackScheduleAvailable = () => {
  // Set the title as "Fallback Unavailable"
  document.getElementById("fallbackTitle").innerText = "Fallback Unavailable";

  // Create a paragraph element and set the text to the explanation
  const errorExplanation = document.createElement("p");
  errorExplanation.innerText =
    "No fallback schedule has been defined. You can define one in the schedules.js file.";
  errorExplanation.setAttribute("id", "noFallbackErrorExplanation");

  // Attach the explanation to the document
  document.getElementById("fallbackList").append(errorExplanation);
};

const fallbackHandler = (errorMessage) => {
  // Check is fallback schedule is available otherwise return and show an error
  if (fallbackSchedule === null) {
    noFallbackScheduleAvailable();
    return;
  }

  // Show error toast if there is an error message
  if (errorMessage) errorToastDisplay(errorMessage);

  // Set the fallback schedule title on the fallbackTitle element
  document.getElementById("fallbackTitle").innerText = fallbackSchedule.name;

  // Here we run this function for every schedule listing in the fallback schedule
  fallbackSchedule.schedule.forEach((scheduleItem) => {
    // Create button for the schedule item, attach name, and set the type as "button"
    let itemButton = document.createElement("button");
    itemButton.innerText = scheduleItem.name;
    itemButton.setAttribute("type", "button");

    /* 
      If there is no URL, disable the button and add a different class
      Otherwise, add an onclick event to the button with a different class
    */
    if (scheduleItem.url === null) {
      itemButton.setAttribute("disabled", "true");
      itemButton.setAttribute(
        "class",
        "fallbackItemButton fallbackItemButtonNoLink"
      );
    } else {
      itemButton.setAttribute(
        "onclick",
        `window.location.href = "${scheduleItem.url}"`
      );
      itemButton.setAttribute(
        "class",
        "fallbackItemButton fallbackItemButtonLink"
      );
    }

    // Finally, attach the container to the fallbackList element
    document.getElementById("fallbackList").append(itemButton);
  });
};
