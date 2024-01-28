import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import type { TimeTypes } from '../types';

// * Takes in a timestamp and returns a RelevantDatesObj for it
type Signature = (
  timestamp: number | string | Date
) => RelevantDatesObjectInterface;

export type RelevantDatesObjectInterface = Record<TimeTypes, number>;

const getRelevantDatesObject: Signature = (timestamp) => {
  const properTimestamp = ensureMsTimestamp(timestamp);

  const dateObj = new Date(properTimestamp);
  const RelevantDatesObj: RelevantDatesObjectInterface = {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    day: dateObj.getDate(),
    hour: dateObj.getHours(),
    minute: dateObj.getMinutes(),
  };

  return RelevantDatesObj;
};

export default getRelevantDatesObject;
