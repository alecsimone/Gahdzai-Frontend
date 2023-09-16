import { Candle } from '@/__generated__/graphql';
import { minimumCandleWidth } from '../constants';
import getCandleWidth from './getCandleWidth';
import countExcessCandles from './countExcessCandles';
import getResizeFactor from './getResizeFactor';
import resizeCandlesForSafety from './resizeCandlesForSafety';

interface CandleResizer {
  candleData: Candle[];
  chartUsableWidth: number;
}

const getSafelySizedCandles = (candleResizerObject: CandleResizer) => {
  const { candleData, chartUsableWidth } = candleResizerObject;

  const baseCandleWidth = getCandleWidth(chartUsableWidth, candleData.length);

  if (baseCandleWidth >= minimumCandleWidth) {
    return { safelySizedCandleData: candleData, candleWidth: baseCandleWidth };
  }

  const excessCandles = countExcessCandles({
    startingCandleCount: candleData.length,
    chartUsableWidth,
    baseCandleWidth,
  });

  const resizeFactor = getResizeFactor(candleData.length, excessCandles);

  const safelySizedCandleData = resizeCandlesForSafety(
    candleData,
    resizeFactor
  );

  const newCandleWidth = getCandleWidth(
    chartUsableWidth,
    safelySizedCandleData.length
  );

  return { safelySizedCandleData, candleWidth: newCandleWidth };
};

export default getSafelySizedCandles;
