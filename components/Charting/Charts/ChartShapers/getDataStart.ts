import sortDataByTime from '../DataWranglers/sortDataByTime';
import type { DataRangeFinder } from './getChartDataRange';

// * Gets the earliest time value in any batch of data
type Signature = (dataRangeFinder: DataRangeFinder) => number;

const getDataStart: Signature = (dataRangeFinder) => {
  const dataPoints = sortDataByTime(dataRangeFinder);
  const startValue = dataPoints[0]!.time;

  return startValue;
};

export default getDataStart;
