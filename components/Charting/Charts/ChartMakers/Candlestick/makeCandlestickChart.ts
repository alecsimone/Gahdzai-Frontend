import type { CandleSet, ChartDataRange, UsableBoundaries } from '../../types';
import makeCandles from './makeCandles';

type Signature = (dataObj: {
  data: CandleSet;
  usableBoundaries: UsableBoundaries;
  chartDataRange: ChartDataRange;
  ctx: CanvasRenderingContext2D;
}) => void;

const makeCandlestickChart: Signature = ({
  data,
  usableBoundaries,
  chartDataRange,
  ctx,
}) => {
  makeCandles({ data, usableBoundaries, chartDataRange, ctx });
};

export default makeCandlestickChart;
