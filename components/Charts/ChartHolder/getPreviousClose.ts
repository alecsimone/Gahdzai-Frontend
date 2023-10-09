import { resolution } from '../Chart/constants';
import { Period } from './ChartPeriodContext';

const getPreviousClose = (period: Period): number => {
  // TODO Handle holidays
  const startDate = new Date();
  const currentDate = startDate.getDate();
  if (period === 'D') {
    startDate.setHours(0, 0, 0, 0); // We want to make sure UTC time doesn't spill over into the next day
    const dayOfWeek = startDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      // Sunday or Monday
      startDate.setDate(currentDate - 3); // We want Thursday's close, or Friday's close for Monday, but either way it's 3 days back
    } else if (dayOfWeek === 6) {
      // Saturday
      startDate.setDate(currentDate - 2); // Again, Thursday's close will be 2 days back
    } else {
      startDate.setDate(currentDate - 1);
    }
  } else if (period === 'W') {
    startDate.setDate(currentDate - 7); // TODO handle when we spill into a different month / year
  } else if (period === 'M') {
    startDate.setDate(currentDate - 30); // TODO Handle months with a different number of days, handle when we spill into a different month / year
  } else if (period === '6M') {
    startDate.setDate(currentDate - 180); // TODO Handle months with a different number of days, handle when we spill into a different month / year
  } else if (period === 'Y') {
    startDate.setDate(currentDate - 365); // TODO Handle leap years, handle when we spill into a different month / year
  } else if (period === 'Max') {
    startDate.setFullYear(1980, 0, 1);
  }

  if (period === 'D') {
    startDate.setUTCHours(19, 60 - resolution, 0, 0); // We want ${resolution} minutes before market close, which is 8PM UTC time, so 19:57 (assuming resolution === 3).
  } else {
    startDate.setUTCHours(6, 0, 0, 0); // This is 2AM East coast time, just to make sure we're on the right day if there's any funky daylight savings time business or anything
  }

  const previousClose = Math.floor(startDate.getTime() / 1000);
  return previousClose;
};

export default getPreviousClose;
