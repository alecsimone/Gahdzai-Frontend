import type { Candle } from '../../types';
import combineCandles from './combineCandles';

// * Takes in an array of candles and a resize factor, and then combines sets of candles within that data so that the total candle count will be reduced by the resize factor
type Signature = (candleData: Candle[], resizeFactor: number) => Candle[];

const resizeCandlesForSafety: Signature = (candleData, resizeFactor) => {
  const safelySizedCandleData: Candle[] = [];

  for (let i = 0; i < candleData.length; i += resizeFactor) {
    const candlesToCombine: Candle[] = [];

    for (let n = 0; n < resizeFactor; n += 1) {
      if (candleData[i + n]) {
        candlesToCombine.push(candleData[i + n]!);
      }
    }

    const newCandle = combineCandles(candlesToCombine);
    safelySizedCandleData.push(newCandle);
  }

  return safelySizedCandleData;
};

export default resizeCandlesForSafety;
