import type { RefObject } from 'react';
import type {
  CandleSet,
  ChartDataRange,
  PercentageChangeSet,
  UsableBoundaries,
} from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import drawPercentageChangeChart from './PercentageChange/drawPercentageChangeChart';

// * A wrapper function that determines what kind of chart we're drawing and calls the corresponding chart drawing function
type Signature = (dataObj: {
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  chartType: ChartTypes;
  chartRef: RefObject<HTMLCanvasElement>;
  chartDataRange: ChartDataRange;
}) => void;

const drawChart: Signature = ({
  data,
  usableBoundaries,
  chartType,
  chartRef,
  chartDataRange,
}) => {
  if (chartType === 'Comparison' && !('candles' in data)) {
    drawPercentageChangeChart({
      data,
      chartDataRange,
      chartRef,
      usableBoundaries,
    });
    return;
  }
  if (chartType === 'Individual' && 'candles' in data) {
    console.log('we got us a candlestick chart here');
  }
};

export default drawChart;
