import { Candle } from '@/__generated__/graphql';

const getChartBottom = (candles: Candle[]) => {
  const lows = candles.map((candle) => parseFloat(candle.low));
  lows.sort();
  return lows[0];
};

export default getChartBottom;
