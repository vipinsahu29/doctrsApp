export const generateTimeSlots = () => {
  const timeSlots = [];
  let startTime = 8 * 60; // 8:00 AM in minutes
  let endTime = 20 * 60; // 8:00 PM in minutes

  while (startTime <= endTime) {
    let hours = Math.floor(startTime / 60);
    let minutes = startTime % 60;
    let formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    timeSlots.push(formattedTime);
    startTime += 15; // Increment by 15 minutes
  }

  return timeSlots;
};
