function getTimeSinceDate(inputDate) {
  let specificDate;

  // Validate and convert input
  if (inputDate instanceof Date) {
    specificDate = inputDate;
  } else if (typeof inputDate === "string" || typeof inputDate === "number") {
    specificDate = new Date(inputDate);
    if (isNaN(specificDate.getTime())) {
      throw new Error("Invalid input: Cannot convert to a valid Date object.");
    }
  } else {
    throw new Error("Invalid input: Must be a Date instance, string, or number.");
  }

  const currentDate = new Date();
  const elapsedMilliseconds = currentDate - specificDate;

  if (elapsedMilliseconds < 0) {
    throw new Error("Invalid input: specificDate must be in the past.");
  }

  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${elapsedSeconds} second${elapsedSeconds > 1 ? "s" : ""} ago`;
  }
}

export default getTimeSinceDate;