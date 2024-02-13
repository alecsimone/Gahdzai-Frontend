import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  UsableBoundaries,
} from '../../types';
import convertCandlesToPoints from './convertCandlesToPoints';
import drawMovingAverageLine from './drawMovingAverageLine';
import makeCandles from './makeCandles';

type Signature = (dataObj: {
  data: CandleSet;
  usableBoundaries: UsableBoundaries;
  chartDataRange: ChartDataRange;
  ctx: CanvasRenderingContext2D;
  coordinatedData: CoordinatedDataPoint[];
}) => void;

const makeCandlestickChart: Signature = ({
  data,
  usableBoundaries,
  chartDataRange,
  ctx,
  coordinatedData,
}) => {
  makeCandles({ data, usableBoundaries, chartDataRange, ctx, coordinatedData });

  const dataPoints = convertCandlesToPoints(data.candles);
  drawMovingAverageLine({
    dataPoints,
    usableHeight: usableBoundaries.usableHeight.current,
    usableWidth: usableBoundaries.usableWidth.current,
    chartTop: chartDataRange.chartTop,
    chartBottom: chartDataRange.chartBottom,
    ctx,
  });
};

export default makeCandlestickChart;
