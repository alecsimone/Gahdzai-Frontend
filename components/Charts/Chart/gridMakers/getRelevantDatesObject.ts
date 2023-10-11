import { PeriodTypes } from '../types';
import ensureMsTimestamp from '../utils/ensureMsTimestamp';

// * Takes in a timestamp and returns a RelevantDatesObj for it
type Signature = (
  timestamp: number | string | Date
) => RelevantDatesObjectInterface;

export type RelevantDatesObjectInterface = Record<PeriodTypes, number>;

const getRelevantDatesObject: Signature = (timestamp) => {
  const properTimestamp = ensureMsTimestamp(timestamp);

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
