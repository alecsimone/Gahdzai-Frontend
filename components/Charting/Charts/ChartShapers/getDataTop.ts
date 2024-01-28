import type { DataRangeFinder } from './getChartDataRange';

// * Gets the highest value in any batch of data
type Signature = (dataRangeFinder: DataRangeFinder) => number;

const getDataTop: Signature = ({ chartType, data }) => {
  let dataTop: number;
  if (chartType === 'CandleSet') {
    dataTop = data.candles[0]!.high;
    data.candles.forEach((candle) => {
      if (candle.high > dataTop) {
        dataTop = candle.high;
      }
    });
  } else {
    dataTop = data[0]!.changes[0]!.change;
    data.forEach((changeSet) => {
      changeSet.changes.forEach((change) => {
        if (change.change > dataTop) {
          dataTop = change.change;
        }
      });
    });
  }

  return dataTop;
};

export default getDataTop;
