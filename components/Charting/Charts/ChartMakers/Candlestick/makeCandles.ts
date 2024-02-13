import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  UsableBoundaries,
} from '../../types';
import drawCandle from './drawCandle';
import getCandleShape from './getCandleShape';
import getSafelySizedCandles from './getSafelySizedCandles';

// * Takes in a CandleSet, figures out how big their corresponding candles should be, and then draws those candles on our chart
type Signature = (dataObj: {
  data: CandleSet;
  usableBoundaries: UsableBoundaries;
  chartDataRange: ChartDataRange;
  ctx: CanvasRenderingContext2D;
  coordinatedData: CoordinatedDataPoint[];
}) => void;

const makeCandles: Signature = ({
  data,
  usableBoundaries: { usableWidth, usableHeight },
  chartDataRange,
  ctx,
  coordinatedData,
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

    const { candleStartX: x } = candleShape;
    const coordinatedDataPoint: CoordinatedDataPoint = {
      symbol: data.symbol,
      x,
      width: candleWidth,
      data: candleData,
    };

    const existingDataPointIndex = coordinatedData.findIndex(
      (cdp) => cdp.symbol === data.symbol && cdp.data.time === candleData.time
    );

    if (existingDataPointIndex === -1) {
      coordinatedData.push(coordinatedDataPoint);
    } else {
      coordinatedData[existingDataPointIndex] = coordinatedDataPoint;
    }

    drawCandle(ctx, candleShape);
  });
};

export default makeCandles;
