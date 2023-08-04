import { Candle } from '@/__generated__/graphql';

const getChartTop = (candles: Candle[]) => {
  const highs = candles.map((candle) => parseFloat(candle.high));
  highs.sort();
  return highs[highs.length - 1];
};

export default getChartTop;
