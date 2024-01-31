import {
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
} from 'react';
import type {
  CandleSet,
  ChartDataRange,
  ChartSize,
  PercentageChangeSet,
} from '../types';
import getYLabels from './getYLabels';
import resetStyling from '../ChartStylers.ts/resetStyling';
import type { ChartTypes } from '../../ChartHolder/types';
import defineUsableBoundaries from './defineUsableBoundaries';
import labelXAxis from './labelXAxis';
import labelYAxis from './labelYAxis';
import drawUsableBoundaries from './drawUsableBoundaries';

// * Applies the labels to our chart
type Signature = (dataObj: {
  chartDataRange: ChartDataRange;
  chartSizeRef: MutableRefObject<ChartSize>;
  chartRef: RefObject<HTMLCanvasElement>;
  chartType: ChartTypes;
  data: CandleSet | PercentageChangeSet[];
}) => {
  usableHeight: MutableRefObject<number>;
  usableWidth: MutableRefObject<number>;
};

const useChartLabels: Signature = ({
  chartDataRange: { chartBottom, chartTop, chartStart, chartEnd },
  chartSizeRef: {
    current: { chartHeight, chartWidth },
  },
  chartRef,
  chartType,
  data,
}) => {
  const yAxisLabels = getYLabels(chartBottom, chartTop, chartHeight);

  const usableHeight = useRef(0);
  const usableWidth = useRef(0);

  useEffect(() => {
    console.log({
      usableWidth: usableWidth.current,
      usableHeight: usableHeight.current,
    });
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      resetStyling(ctx);

      const { newUsableWidth, newUsableHeight } = defineUsableBoundaries({
        ctx,
        yAxisLabels,
        chartType,
        usableWidth,
        usableHeight,
        chartWidth,
        chartHeight,
      });
      usableWidth.current = newUsableWidth;
      usableHeight.current = newUsableHeight;

      drawUsableBoundaries({
        ctx,
        usableWidth: usableWidth.current,
        usableHeight: usableHeight.current,
      });

      labelXAxis({
        chartStart,
        chartEnd,
        chartWidth,
        data,
        usableWidth,
        usableHeight,
        ctx,
      });

      labelYAxis({
        yAxisLabels,
        chartBottom,
        chartTop,
        usableHeight,
        usableWidth,
        ctx,
        decorator: chartType === 'Comparison' ? '%' : '',
      });
    }
  });

  return { usableHeight, usableWidth };
};

export default useChartLabels;
