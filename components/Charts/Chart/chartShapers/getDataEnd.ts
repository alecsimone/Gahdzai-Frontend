import { Candle } from '@/__generated__/graphql';

const getDataEnd = (candles: Candle[]) => {
  const lastCandleStart = parseInt(candles[candles.length - 1].time, 10);
  const penultimateCandleStart = parseInt(candles[candles.length - 2].time, 10);
  const candleDuration = lastCandleStart - penultimateCandleStart;

  const endOfLastCandle = lastCandleStart + candleDuration;
  return `${endOfLastCandle}`;
};

export default getDataEnd;
