import type { CandleSet, PercentageChangeSet } from '../types';

// * Takes in any of our types of data and spits out an array of the time values within that data
type Signature = (data: CandleSet | PercentageChangeSet[]) => number[];

const makeTimesArray: Signature = (data) => {
  let timesArray: number[] = [];
  if (!Array.isArray(data)) {
    timesArray = data.candles.map((candle) => candle.time);
  } else {
    timesArray = data[0]!.changes.map((change) => change.time);
  }

  return timesArray;
};

export default makeTimesArray;
