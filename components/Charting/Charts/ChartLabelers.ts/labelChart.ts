import { midBlack, lightBlack } from '@/styles/constants/colors';
import type { ChartDataRange, ChartSize, UsableBoundaries } from '../types';
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
  chartSize: ChartSize;
  labelDecorator: string;
  usableBoundaries: UsableBoundaries;
  timesArray: number[];
}) => void;

const labelChart: Signature = ({
  ctx,
  chartDataRange: { chartBottom, chartTop, chartStart, chartEnd },
  chartSize: { chartHeight, chartWidth },
  labelDecorator,
  usableBoundaries: { usableHeight, usableWidth },
  timesArray,
}) => {
  resetStyling(ctx);

  const yAxisLabels = getYLabels(chartBottom, chartTop, chartHeight);

  const { newUsableWidth, newUsableHeight } = defineUsableBoundaries({
    ctx,
    yAxisLabels,
    labelDecorator,
    chartWidth,
    chartHeight,
  });
  usableWidth.current = newUsableWidth;
  usableHeight.current = newUsableHeight;

  ctx.fillStyle = `${midBlack}`;
  ctx.fillRect(0, 0, usableWidth.current, usableHeight.current);
  ctx.fillStyle = `${lightBlack}`;
  ctx.fillRect(0, usableHeight.current, chartWidth, chartHeight);
  ctx.fillRect(usableWidth.current, 0, chartWidth, chartHeight);

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
    decorator: labelDecorator,
  });
};

export default labelChart;
