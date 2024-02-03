import { useEffect, type MutableRefObject, type RefObject } from 'react';
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
  chartSizeRef: MutableRefObject<ChartSize>;
  chartRef: RefObject<HTMLCanvasElement>;
  chartType: ChartTypes;
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
}) => void;

const useChartLabels: Signature = ({
  chartDataRange,
  chartSizeRef,
  usableBoundaries,
  chartRef,
  chartType,
  data,
}) => {
  const timesArray = makeTimesArray(data);
  const labelDecorator = chartType === 'Comparison' ? '%' : '';

  const ctx = chartRef.current?.getContext('2d');
  if (ctx) {
    labelChart({
      ctx,
      chartDataRange,
      chartSizeRef,
      labelDecorator,
      usableBoundaries,
      timesArray,
    });
  }

  useEffect(() => {
    if (ctx == null) {
      return () => {
        console.log('chart did not render properly.');
      };
    }
    const labelChartHandler = () => {
      labelChart({
        ctx,
        chartDataRange,
        chartSizeRef,
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
    chartSizeRef,
    labelDecorator,
    data,
    usableBoundaries,
    timesArray,
  ]);
};

export default useChartLabels;
