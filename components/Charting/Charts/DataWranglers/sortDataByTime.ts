import type { DataRangeFinder } from '../ChartShapers/getChartDataRange';
import type { Candle, PercentageChange } from '../types';

// * Takes in a dataRangeFinder and returns an array of the data within it, sorted by time
type Signature = (
  dataRangeFinder: DataRangeFinder
) => Candle[] | PercentageChange[];

const sortDataByTime: Signature = ({ chartType, data }) => {
  let dataPoints: Candle[] | PercentageChange[];
  if (chartType === 'CandleSet') {
    dataPoints = data.candles!;
  } else {
    let dataPointsSoFar: PercentageChange[] = [];
    data.forEach((changeSet) => {
      dataPointsSoFar = dataPointsSoFar.concat(changeSet.changes);
    });

    dataPoints = dataPointsSoFar;
  }
  dataPoints.sort((a, b) => a.time - b.time);

  return dataPoints;
};

export default sortDataByTime;
