import { PeriodTypes } from '../types';

// * Takes in a timestamp and returns a RelevantDatesObj for it
type Signature = (timestamp: number | string) => RelevantDatesObjectInterface;

export type RelevantDatesObjectInterface = Record<PeriodTypes, number>;

const getRelevantDatesObject: Signature = (timestamp) => {
  let properTimestamp =
    typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  if (properTimestamp < 99999999999) {
    // We can safely assume that a 11 digit number represents a timestamp in seconds
    properTimestamp *= 1000;
  }
  const dateObj = new Date(properTimestamp);
  const RelevantDatesObj: RelevantDatesObjectInterface = {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    date: dateObj.getDate(),
    hour: dateObj.getHours(),
    minute: dateObj.getMinutes(),
  };

  return RelevantDatesObj;
};

export default getRelevantDatesObject;
