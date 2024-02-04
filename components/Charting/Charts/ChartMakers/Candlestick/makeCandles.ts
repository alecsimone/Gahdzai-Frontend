import type { CandleSet, ChartDataRange, UsableBoundaries } from '../../types';
import drawCandle from './drawCandle';
import getCandleShape from './getCandleShape';
import getSafelySizedCandles from './getSafelySizedCandles';

// * Takes in a CandleSet, figures out how big their corresponding candles should be, and then draws those candles on our chart
type Signature = (dataObj: {
  data: CandleSet;
  usableBoundaries: UsableBoundaries;
  chartDataRange: ChartDataRange;
  ctx: CanvasRenderingContext2D;
}) => void;

const makeCandles: Signature = ({
  data,
  usableBoundaries: { usableWidth, usableHeight },
  chartDataRange,
  ctx,
}) => {
  const { safelySizedCandleData, candleWidth } = getSafelySizedCandles({
    data,
    usableWidth: usableWidth.current,
  });

  safelySizedCandleData.forEach((candleData, candleIndex) => {
    const candleShape = getCandleShape({
      candleData,
      candleWidth,
      usableHeight: usableHeight.current,
      usableWidth: usableWidth.current,
      chartDataRange,
      candleIndex,
      totalCandles: safelySizedCandleData.length,
    });

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
