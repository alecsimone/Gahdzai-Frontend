import type {
  CandleSet,
  ChartDataRange,
  PercentageChangeSet,
  UsableBoundaries,
} from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import makePercentageChangeChart from './PercentageChange/makePercentageChangeChart';

// * A wrapper function that determines what kind of chart we're drawing and calls the corresponding chart drawing function
type Signature = (dataObj: {
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  chartType: ChartTypes;
  ctx: CanvasRenderingContext2D;
  chartDataRange: ChartDataRange;
}) => void;

const drawChart: Signature = ({
  data,
  usableBoundaries,
  chartType,
  ctx,
  chartDataRange,
}) => {
  console.log('drawing the chart');
  if (chartType === 'Comparison' && !('candles' in data)) {
    makePercentageChangeChart({
      data,
      chartDataRange,
      ctx,
      usableBoundaries,
    });
    return;
  }
  if (chartType === 'Individual' && 'candles' in data) {
    console.log('we got us a candlestick chart here');
  }
};

export default drawChart;
