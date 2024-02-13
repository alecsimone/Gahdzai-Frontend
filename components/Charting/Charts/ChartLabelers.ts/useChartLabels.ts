import { useEffect } from 'react';
import type {
  CandleSet,
  ChartDataRange,
  ChartSize,
  PercentageChangeSet,
  UsableBoundaries,
} from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import labelChart from './labelChart';
import makeTimesArray from './makeTimesArray';

// * Applies the labels to our chart
type Signature = (dataObj: {
  chartDataRange: ChartDataRange;
  chartSize: ChartSize;
  ctx: CanvasRenderingContext2D | null | undefined;
  chartType: ChartTypes;
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
}) => void;

const useChartLabels: Signature = ({
  chartDataRange,
  chartSize,
  usableBoundaries,
  ctx,
  chartType,
  data,
}) => {
  const timesArray = makeTimesArray(data);
  const labelDecorator = chartType === 'Comparison' ? '%' : '';

  if (ctx) {
    labelChart({
      ctx,
      chartDataRange,
      chartSize,
      labelDecorator,
      usableBoundaries,
      timesArray,
    });
  }

  useEffect(() => {
    if (ctx == null) {
      return () => {};
    }
    const labelChartHandler = () => {
      labelChart({
        ctx,
        chartDataRange,
        chartSize,
        labelDecorator,
        usableBoundaries,
        timesArray,
      });
    };

    if (ctx) {
      window.addEventListener('resize', labelChartHandler);
    }

    return () => {
      window.removeEventListener('resize', labelChartHandler);
    };
  }, [
    ctx,
    chartDataRange,
    chartSize,
    labelDecorator,
    data,
    usableBoundaries,
    timesArray,
  ]);
};

export default useChartLabels;
