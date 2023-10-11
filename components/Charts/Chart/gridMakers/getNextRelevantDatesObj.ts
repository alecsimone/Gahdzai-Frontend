import { PeriodTypes } from '../types';
import ensureMsTimestamp from '../utils/ensureMsTimestamp';
import getRelevantDatesObject, {
  RelevantDatesObjectInterface,
} from './getRelevantDatesObject';
import increaseDateByPeriod from './increaseDateByPeriod';

// * Takes in a Date object, period, and periodType, moves the date forward by the amount of the period, and returns a new RelevantDateObj for the new Date
type Signature = (
  startingDate: Date | string | number,
  period: number,
  periodType: PeriodTypes
) => RelevantDatesObjectInterface;

const getNextRelevantDatesObj: Signature = (
  startingDate,
  period,
  periodType
) => {
  const startingDateObj = new Date(ensureMsTimestamp(startingDate));
  const nextPeriodDate = increaseDateByPeriod(
    startingDateObj,
    period,
    periodType
  );

  const nextRelevantDatesObj = getRelevantDatesObject(nextPeriodDate);

  return nextRelevantDatesObj;
};

export default getNextRelevantDatesObj;
