import { Candle } from '@/__generated__/graphql';
import { minimumCandleWidth } from '../constants';
import getCandleWidth from './getCandleWidth';
import combineCandles from './combineCandles';

interface CandleResizer {
  candleData: Candle[];
  chartUsableWidth: number;
}

const getSafelySizedCandles = (candleResizerObject: CandleResizer) => {
  const { candleData, chartUsableWidth } = candleResizerObject;

  let newCandleWidth;
  let excessCandles = 0;
  for (let i = candleData.length; i > 0; i -= 1) {
    if (newCandleWidth == null || newCandleWidth < minimumCandleWidth) {
      newCandleWidth = getCandleWidth(chartUsableWidth, i);
      if (newCandleWidth >= minimumCandleWidth) {
        excessCandles = candleData.length - i;
      }
    }
  }

  const maxCandlesAllowed = candleData.length - excessCandles;
  const candlesLeftRatio = maxCandlesAllowed / candleData.length;
  const resizeFactor = Math.ceil(1 / candlesLeftRatio);

  const safelySizedCandles: Candle[] = [];
  for (let i = 0; i < candleData.length; i += resizeFactor) {
    const candlesToCombine: Candle[] = [];
    for (let n = 0; n < resizeFactor; n += 1) {
      if (candleData[n + i] != null) {
        candlesToCombine.push(candleData[n + i]);
      }
    }
    const newCandle = combineCandles(candlesToCombine);
    safelySizedCandles.push(newCandle);
  }

  return safelySizedCandles;
};

export default getSafelySizedCandles;
