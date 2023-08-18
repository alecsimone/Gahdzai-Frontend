import { Candle } from '@/__generated__/graphql';

const getDataBottom = (candles: Candle[]) => {
  const lows = candles.map((candle) => parseFloat(candle.low));
  lows.sort();
  return lows[0];
};

export default getDataBottom;
