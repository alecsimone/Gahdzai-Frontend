import type { PeriodTypes } from '../types';
import getRelevantDatesObject from './getRelevantDatesObject';

// * Takes in a starting Date object, a period, and a period type. It increases the starting time by the period and returns a date object for the new time.
type Signature = (
  startingTime: Date,
  period: number,
  periodType: PeriodTypes
  //            ^?
) => Date;

const increaseDateByPeriod: Signature = (startingTime, period, periodType) => {
  const nextTime = startingTime;

  const {
    year: oldYear,
    month: oldMonth,
    date: oldDate,
    hour: oldHour,
    minute: oldMinute,
  } = getRelevantDatesObject(startingTime);

  if (periodType === 'year') {
    nextTime.setFullYear(oldYear + period);
  } else if (periodType === 'month') {
    nextTime.setFullYear(oldYear, oldMonth + period);
  } else if (periodType === 'date') {
    nextTime.setFullYear(oldYear, oldMonth, oldDate + period);
  } else if (periodType === 'hour') {
    nextTime.setHours(oldHour + period);
  } else if (periodType === 'minute') {
    nextTime.setHours(oldHour, oldMinute + period);
  }

  return nextTime;
};

export default increaseDateByPeriod;
