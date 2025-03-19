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
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/; // Ensures number starts with 6-9 and is 10 digits long
  return mobileRegex.test(mobile);
};