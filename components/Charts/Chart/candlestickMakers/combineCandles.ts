import { Candle } from '@/__generated__/graphql';

const combineCandles = (candles: Candle[]) => {
  // First let's make sure they're in the right order by sorting by time
  const sortedCandles = candles.sort(
    (a, b) => parseInt(a.time, 10) - parseInt(b.time, 10)
  );

  // close will be the close of the last candle
  const { close } = sortedCandles.at(-1)!;

  // open will be the open of the first candle
  const { open } = sortedCandles[0];

  // time will be the time of the first candle
  const { time } = sortedCandles[0];

  // high will be the highest high of any of the candles
  const high = `${sortedCandles.reduce((currentHigh, thisValue) => {
    if (parseFloat(thisValue.high) > currentHigh) {
      return parseFloat(thisValue.high);
    }
    return currentHigh;
  }, 0)}`;

  // low will be the lowest low of any of the candles
  const low = `${sortedCandles.reduce((currentLow, thisValue) => {
    if (parseFloat(thisValue.low) < currentLow) {
      return parseFloat(thisValue.low);
    }
    return currentLow;
  }, Infinity)}`;

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
