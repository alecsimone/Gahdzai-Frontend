import type { TimeTypes } from '../types';
import getRelevantDatesObject from './getRelevantDatesObject';

// * Takes in a starting Date object, a period, and a period type. It increases the starting time by the period and returns a date object for the new time.
type Signature = (
  startingTime: Date,
  time: number,
  timeType: TimeTypes
  //            ^?
) => Date;

const increaseDateByTimeStep: Signature = (startingTime, time, timeType) => {
  const nextTime = startingTime;

  const {
    year: oldYear,
    month: oldMonth,
    day: oldDay,
    hour: oldHour,
    minute: oldMinute,
  } = getRelevantDatesObject(startingTime);

  if (timeType === 'year') {
    nextTime.setFullYear(oldYear + time);
  } else if (timeType === 'month') {
    nextTime.setFullYear(oldYear, oldMonth + time);
  } else if (timeType === 'day') {
    nextTime.setFullYear(oldYear, oldMonth, oldDay + time);
  } else if (timeType === 'hour') {
    nextTime.setHours(oldHour + time);
  } else if (timeType === 'minute') {
    nextTime.setHours(oldHour, oldMinute + time);
  }

  return nextTime;
};

export default increaseDateByTimeStep;
