import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import { type Period } from '../../PeriodButtons/ChartPeriodContextTypes';
import getPreviousCloseDate from './getPreviousCloseDate';

// * Takes in a period and gets the starting point for a query of that period. For a week, month, 6 months, a year, or max, that's easy. We just subtract that amount of time from the current date and if that happens to fall on a weekend or something it's ok, we just get the data since then. But for one day it's harder, because we have to make sure we get the close of the last trading day, which means it can't be a weekend or a holiday.
type Signature = (period: Period) => number;

const resolution = 1;

const getPeriodStart: Signature = (period) => {
  // TODO Handle holidays
  let startDate = new Date();
  const currentDate = startDate.getDate();
  if (period === 'D') {
    startDate = getPreviousCloseDate(startDate);
  } else if (period === 'W') {
    startDate.setDate(currentDate - 7);
  } else if (period === 'M') {
    const currentMonth = startDate.getMonth();
    startDate.setDate(currentMonth - 1);
  } else if (period === '6M') {
    const currentMonth = startDate.getMonth();
    startDate.setDate(currentMonth - 6);
  } else if (period === 'Y') {
    const currentYear = startDate.getFullYear();
    startDate.setFullYear(currentYear - 1);
  } else if (period === 'Max') {
    startDate.setFullYear(1980, 0, 1);
  }

  if (period === 'D') {
    startDate.setUTCHours(20, 60 - resolution, 0, 0); // We want ${resolution} minutes before market close, which is 9PM UTC time, so 20:57 (assuming resolution === 3).
  } else {
    startDate.setUTCHours(7, 0, 0, 0); // This is 2AM East coast time, just to make sure we're on the right day if there's any funky daylight savings time business or anything
  }

  const previousClose = Math.floor(startDate.getTime() / 1000);
  return ensureMsTimestamp(previousClose);
};

export default getPeriodStart;
