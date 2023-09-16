import { Candle } from '@/__generated__/graphql';
import combineCandles from './combineCandles';

const resizeCandlesForSafety = (candleData: Candle[], resizeFactor: number) => {
  const safelySizedCandleData: Candle[] = [];

  for (let i = 0; i < candleData.length; i += resizeFactor) {
    const candlesToCombine: Candle[] = [];

    for (let n = 0; n < resizeFactor; n += 1) {
      if (candleData[i + n] != null) {
        candlesToCombine.push(candleData[i + n]);
      }
    }

    const newCandle = combineCandles(candlesToCombine);
    safelySizedCandleData.push(newCandle);
  }

  return safelySizedCandleData;
};

export default resizeCandlesForSafety;
