import { resolution } from '../Chart/constants';

const getPreviousClose = (startDate: Date): number => {
  // TODO Handle holidays
  startDate.setHours(0, 0, 0, 0); // We want to make sure UTC time doesn't spill over into the next day
  const dayOfWeek = startDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 1) {
    // Sunday or Monday
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 3); // We want Thursday's close, or Friday's close for Monday, but either way it's 3 days back
  } else if (dayOfWeek === 6) {
    // Saturday
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 2); // Again, Thursday's close will be 2 days back
  } else {
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 1);
  }

  startDate.setUTCHours(19, 60 - resolution, 0, 0); // We want ${resolution} minutes before market close, which is 8PM UTC time, so 19:57 (assuming resolution === 3).

  const previousClose = Math.floor(startDate.getTime() / 1000);
  return previousClose;
};

export default getPreviousClose;
