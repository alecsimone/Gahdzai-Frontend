import { minimumCandleWidth } from '../../constants';
import type { Candle, CandleSet } from '../../types';
import countExcessCandles from './countExcessCandles';
import getCandleWidth from './getCandleWidth';
import getResizeFactor from './getResizeFactor';
import resizeCandlesForSafety from './resizeCandlesForSafety';

// * Takes in candleData and the width of our chart and figures out how big they should be to fit on our chart
type Signature = (dataObj: { data: CandleSet; usableWidth: number }) => {
  safelySizedCandleData: Candle[];
  candleWidth: number;
};

const getSafelySizedCandles: Signature = ({
  data: { candles },
  usableWidth,
}) => {
  const baseCandleWidth = getCandleWidth(usableWidth, candles.length);

  if (baseCandleWidth >= minimumCandleWidth) {
    return { safelySizedCandleData: candles, candleWidth: baseCandleWidth };
  }

  const excessCandles = countExcessCandles({
    startingCandleCount: candles.length,
    usableWidth,
    baseCandleWidth,
  });

  const resizeFactor = getResizeFactor(candles.length, excessCandles);

  const safelySizedCandleData = resizeCandlesForSafety(candles, resizeFactor);

  const newCandleWidth = getCandleWidth(
    usableWidth,
    safelySizedCandleData.length
  );

  return {
    safelySizedCandleData,
    candleWidth: newCandleWidth,
  };
};

export default getSafelySizedCandles;
