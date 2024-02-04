import type { Candle } from '../../types';

// * Takes in an array of candles and reduces them down to a single combined candle
type Signature = (candles: Candle[]) => Candle;

const combineCandles: Signature = (candles) => {
  // First let's make sure they're in the right order by sorting by time
  const sortedCandles = candles.sort((a, b) => a.time - b.time);

  // close will be the close of the last candle
  const { close } = sortedCandles.at(-1)!;

  // open will be the open of the first candle
  const { open } = sortedCandles[0]!;

  // time will be the time of the first candle
  const { time } = sortedCandles[0]!;

  // high will be the highest high of any of the candles
  const high = sortedCandles.reduce((currentHigh, thisValue) => {
    if (thisValue.high > currentHigh) {
      return thisValue.high;
    }
    return currentHigh;
  }, 0);

  // low will be the lowest low of any of the candles
  const low = sortedCandles.reduce((currentLow, thisValue) => {
    if (thisValue.low < currentLow) {
      return thisValue.low;
    }
    return currentLow;
  }, Infinity);

  const newCandle: Candle = {
    time,
    close,
    open,
    high,
    low,
  };

  return newCandle;
};

export default combineCandles;
