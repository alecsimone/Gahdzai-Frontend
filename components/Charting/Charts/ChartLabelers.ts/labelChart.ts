import type { MutableRefObject } from 'react';
import type { ChartDataRange, ChartSize, UsableBoundaries } from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import getYLabels from './getYLabels';
import resetStyling from '../ChartStylers.ts/resetStyling';
import defineUsableBoundaries from './defineUsableBoundaries';
import drawUsableBoundaries from './drawUsableBoundaries';
import labelXAxis from './labelXAxis';
import labelYAxis from './labelYAxis';

// * A handler function for labeling the chart that we can call after the canvas mounts and also attach to a resize listener
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  chartDataRange: ChartDataRange;
  chartSizeRef: MutableRefObject<ChartSize>;
  chartType: ChartTypes;
  usableBoundaries: UsableBoundaries;
  timesArray: number[];
}) => void;

const labelChart: Signature = ({
  ctx,
  chartDataRange: { chartBottom, chartTop, chartStart, chartEnd },
  chartSizeRef: {
    current: { chartHeight, chartWidth },
  },
  chartType,
  usableBoundaries: { usableHeight, usableWidth },
  timesArray,
}) => {
  resetStyling(ctx);

  const yAxisLabels = getYLabels(chartBottom, chartTop, chartHeight);

  const { newUsableWidth, newUsableHeight } = defineUsableBoundaries({
    ctx,
    yAxisLabels,
    chartType,
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
    timesArray,
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
};

export default labelChart;
