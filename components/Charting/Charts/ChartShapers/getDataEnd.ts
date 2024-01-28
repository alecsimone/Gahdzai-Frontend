import sortDataByTime from '../DataWranglers/sortDataByTime';
import type { DataRangeFinder } from './getChartDataRange';

// * Gets the latest time value in any batch of data
type Signature = (dataRangeFinder: DataRangeFinder) => number;

const getDataEnd: Signature = (dataRangeFinder) => {
  const dataPoints = sortDataByTime(dataRangeFinder);

  const lastDataPoint = dataPoints.at(-1)!;
  const endValue = lastDataPoint.time;

  return endValue;
};

export default getDataEnd;
