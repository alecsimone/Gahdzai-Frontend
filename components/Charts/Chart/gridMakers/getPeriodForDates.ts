import type { RelevantDatesObjectInterface } from './getRelevantDatesObject';
import type { PeriodTypes } from '../types';
import getMaxSteps from './getMaxSteps';

// * Takes in the width of a chart and its first and last dates and figures out what the best period type for that chart will be, as well as what the actual period itself should be
type Signature = (
  usableWidth: number,
  relevantDatesObjs: RelevantDatesObjectInterface[]
) => {
  period: number;
  periodType: PeriodTypes;
};

const getPeriodForDates: Signature = (usableWidth, relevantDatesObjs) => {
  const [firstRelevantDatesObj, lastRelevantDatesObj] = relevantDatesObjs;

  if (lastRelevantDatesObj == null || firstRelevantDatesObj == null) {
    return {
      period: -1,
      periodType: 'date',
    };
  }

  const maxSteps = getMaxSteps(usableWidth);

  let periodType: PeriodTypes = 'minute' as PeriodTypes;
  let range = 0;

  const periodTypes: PeriodTypes[] = ['year', 'month', 'date', 'hour'];
  periodTypes.forEach((currentPeriodType, index) => {
    if (
      periodType === 'minute' && // Only keep checking if we haven't already reassigned it
      lastRelevantDatesObj[currentPeriodType] !==
        firstRelevantDatesObj[currentPeriodType]
    ) {
      const rangeSize =
        lastRelevantDatesObj[currentPeriodType] -
        firstRelevantDatesObj[currentPeriodType];

      if (rangeSize > maxSteps / 2) {
        periodType = currentPeriodType;
        range = rangeSize;
      } else if (periodTypes[index + 1] != null) {
        periodType = periodTypes[index + 1]!;
        const nextRangeSize =
          lastRelevantDatesObj[periodType] - firstRelevantDatesObj[periodType];

        if (currentPeriodType === 'year') {
          range = 12 * rangeSize + nextRangeSize;
        } else if (currentPeriodType === 'month') {
          range = 22 * rangeSize + nextRangeSize; // Roughly 22 trading days in a month
        } else if (currentPeriodType === 'date') {
          range = 7 * rangeSize + nextRangeSize; // Technically 6.5 hours in a trading day, but we can round up
        } else if (currentPeriodType === 'hour') {
          range = 60 * rangeSize + nextRangeSize;
        }
      } else {
        const nextRangeSize =
          lastRelevantDatesObj.minute - firstRelevantDatesObj.minute;
        range = 60 * rangeSize + nextRangeSize;
      }
    }
  });

  const rawPeriod = range / maxSteps;
  let period: number;
  if (periodType === 'minute') {
    period = Math.ceil(rawPeriod / 5) * 5;
  } else {
    period = Math.ceil(rawPeriod);
  }

  return { period, periodType };
};

export default getPeriodForDates;
