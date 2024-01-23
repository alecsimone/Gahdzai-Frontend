import type { DataPoint, PeriodTypes } from '../types';
import getPeriodForDates from './getPeriodForDates';
import getRelevantDatesObject from './getRelevantDatesObject';

// * Takes in a usableWidth and the datapoints for a chart and figures out what the period of that chart should be (ie, how frequently the vertical grid lines and their labels should come)
type Signature = (
  usableWidth: number,
  datapoints: DataPoint[]
) => { period: number; periodType: PeriodTypes };

const getTimePeriod: Signature = (usableWidth, datapoints) => {
  const firstRelevantDatesObj = getRelevantDatesObject(datapoints[0]!.time);

  const lastRelevantDatesObj = getRelevantDatesObject(
    datapoints[datapoints.length - 1]!.time
  );

  const { period, periodType } = getPeriodForDates(usableWidth, [
    firstRelevantDatesObj,
    lastRelevantDatesObj,
  ]);

  return { period, periodType };
};

export default getTimePeriod;
