import type { CandleSet, PercentageChangeSet, ChartDataRange } from '../types';
import getDataBottom from './getDataBottom';
import getDataEnd from './getDataEnd';
import getDataStart from './getDataStart';
import getDataTop from './getDataTop';

// * Gets the highest and lowest values for both the X and Y axes of our data
type Signature = (data: CandleSet | PercentageChangeSet[]) => ChartDataRange;

export type DataRangeFinder =
  | {
      chartType: 'PercentageChangeSet';
      data: PercentageChangeSet[];
    }
  | {
      chartType: 'CandleSet';
      data: CandleSet;
    };

const getChartDataRange: Signature = (data) => {
  let dataRangeFinder: DataRangeFinder;
  if (Array.isArray(data)) {
    dataRangeFinder = {
      chartType: 'PercentageChangeSet',
      data,
    };
  } else {
    dataRangeFinder = {
      chartType: 'CandleSet',
      data,
    };
  }

  const chartTop = getDataTop(dataRangeFinder);
  const chartBottom = getDataBottom(dataRangeFinder);
  const chartStart = getDataStart(dataRangeFinder);
  const chartEnd = getDataEnd(dataRangeFinder);

  return {
    chartTop,
    chartBottom,
    chartStart,
    chartEnd,
  };
};

export default getChartDataRange;
