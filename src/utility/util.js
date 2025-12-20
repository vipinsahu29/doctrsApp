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

export const generateTimeSlotsV2 = (time) => {
  const timeSlots = ['Shift 1'];
  time?.map((slot, i) => {
    const [start] = String(slot.startTime).split(":").map(Number);
    const [end] = String(slot.endTime).split(":").map(Number);

    for (let minutes = start * 60; minutes <= end * 60; minutes += 10) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      timeSlots.push(
        `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
      );
    }
    if (i + 1 < time.length) timeSlots.push(`Shift ${i + 2}`);
  });
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

export const calculateExperience = (careerStartDate) => {
  const [year, month, day] = careerStartDate.split("-").map(Number); // Convert to Date object
  const today = new Date();
  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} Y ${months} M`;
};

export const validatePasswords = (
  password,
  confirmPassword = "",
  lengthCheck = false
) => {
  if (confirmPassword && password !== confirmPassword) {
    return "Passwords do not match";
  }
  if (!!password && password.length < 8 && lengthCheck) {
    return "Password must be at least 8 characters long";
  }
  return null;
};
