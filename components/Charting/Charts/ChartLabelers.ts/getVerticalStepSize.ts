import type { TimeTypes } from '../types';
import getMaxSteps from './getMaxSteps';
import getRelevantDatesObject from './getRelevantDatesObject';

// * Takes in the width of a chart and its first and last dates and figures out what the best period type for that chart will be, as well as what the actual period itself should be
type Signature = (
  chartStart: number,
  chartEnd: number,
  chartWidth: number
) => {
  time: number;
  timeType: TimeTypes;
};

const getVerticalStepSize: Signature = (chartStart, chartEnd, chartWidth) => {
  const firstRelevantDatesObj = getRelevantDatesObject(chartStart);
  const lastRelevantDatesObj = getRelevantDatesObject(chartEnd);

  if (lastRelevantDatesObj == null || firstRelevantDatesObj == null) {
    return {
      time: -1,
      timeType: 'day',
    };
  }

  const maxSteps = getMaxSteps(chartWidth);

  let timeType: TimeTypes = 'minute' as TimeTypes;
  let range = 0;

  const timeTypes: TimeTypes[] = ['year', 'month', 'day', 'hour'];
  timeTypes.forEach((currentTimeType, index) => {
    if (
      timeType === 'minute' && // Only keep checking if we haven't already reassigned it
      lastRelevantDatesObj[currentTimeType] !==
        firstRelevantDatesObj[currentTimeType]
    ) {
      const rangeSize =
        lastRelevantDatesObj[currentTimeType] -
        firstRelevantDatesObj[currentTimeType];

      if (rangeSize > maxSteps / 2) {
        timeType = currentTimeType;
        range = rangeSize;
      } else if (timeTypes[index + 1] != null) {
        timeType = timeTypes[index + 1]!;
        const nextRangeSize =
          lastRelevantDatesObj[timeType] - firstRelevantDatesObj[timeType];

        if (currentTimeType === 'year') {
          range = 12 * rangeSize + nextRangeSize;
        } else if (currentTimeType === 'month') {
          range = 22 * rangeSize + nextRangeSize; // Roughly 22 trading days in a month
        } else if (currentTimeType === 'day') {
          range = 7 * rangeSize + nextRangeSize; // Technically 6.5 hours in a trading day, but we can round up
        } else if (currentTimeType === 'hour') {
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
  let time: number;
  if (timeType === 'minute') {
    time = Math.ceil(rawPeriod / 5) * 5;
  } else {
    time = Math.ceil(rawPeriod);
  }

  return { time, timeType };
};

export default getVerticalStepSize;
