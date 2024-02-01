import type { RefObject } from 'react';
import type {
  CandleSet,
  ChartDataRange,
  PercentageChangeSet,
  UsableBoundaries,
} from '../../types';

// * Draws a percentage change chart
type Signature = (dataObj: {
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  chartRef: RefObject<HTMLCanvasElement>;
  chartDataRange: ChartDataRange;
}) => void;

const drawPercentageChangeChart: Signature = () => {};

export default drawPercentageChangeChart;
