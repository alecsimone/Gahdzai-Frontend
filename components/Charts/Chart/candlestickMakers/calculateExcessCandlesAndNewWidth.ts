import { minimumCandleWidth } from '../constants';
import getCandleWidth from './getCandleWidth';

interface CandleTrimmerInterface {
  startingCandleCount: number;
  chartUsableWidth: number;
  baseCandleWidth: number;
}

const calculateExcessCandlesAndNewWidth = (
  candleTrimmerInterface: CandleTrimmerInterface
) => {
  const { startingCandleCount, chartUsableWidth, baseCandleWidth } =
    candleTrimmerInterface;

  let newCandleWidth = baseCandleWidth;
  let excessCandles = 0;
  for (let i = startingCandleCount; i > 0; i -= 1) {
    if (newCandleWidth < minimumCandleWidth) {
      newCandleWidth = getCandleWidth(chartUsableWidth, i);
      if (newCandleWidth >= minimumCandleWidth) {
        excessCandles = startingCandleCount - i;
      }
    }
  }

  return { excessCandles, newCandleWidth };
};

export default calculateExcessCandlesAndNewWidth;
