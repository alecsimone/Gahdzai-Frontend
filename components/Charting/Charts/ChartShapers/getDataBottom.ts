import type { DataRangeFinder } from './getChartDataRange';

// * Gets the lowest value in any batch of data
type Signature = (dataRangeFinder: DataRangeFinder) => number;

const getDataBottom: Signature = ({ chartType, data }) => {
  let dataBottom: number;
  if (chartType === 'CandleSet') {
    dataBottom = data.candles[0]!.low;
    data.candles.forEach((candle) => {
      if (candle.low < dataBottom) {
        dataBottom = candle.low;
      }
    });
  } else {
    dataBottom = data[0]!.changes[0]!.change;
    data.forEach((changeSet) => {
      changeSet.changes.forEach((change) => {
        if (change.change < dataBottom) {
          dataBottom = change.change;
        }
      });
    });
  }

  return dataBottom;
};

export default getDataBottom;
