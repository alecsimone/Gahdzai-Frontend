import { minimumCandleWidth } from '../../constants';
import getCandleWidth from './getCandleWidth';

// * Figures out how much we need to reduce our candle length by so that the candles will fit in our chart
type Signature = (dataObj: {
  startingCandleCount: number;
  usableWidth: number;
  baseCandleWidth: number;
}) => number;

const countExcessCandles: Signature = ({
  startingCandleCount,
  usableWidth,
  baseCandleWidth,
}) => {
  let newCandleWidth = baseCandleWidth;
  let excessCandles = 0;
  for (let i = startingCandleCount; i > 0; i -= 1) {
    if (newCandleWidth < minimumCandleWidth) {
      newCandleWidth = getCandleWidth(usableWidth, i);
      if (newCandleWidth >= minimumCandleWidth) {
        excessCandles = startingCandleCount - i;
      }
    }
  }

  return excessCandles;
};

export default countExcessCandles;
