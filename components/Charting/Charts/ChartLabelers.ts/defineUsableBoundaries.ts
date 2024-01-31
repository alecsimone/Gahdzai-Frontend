import type { MutableRefObject } from 'react';
import { usableBoundaryStrokeWidth } from '../constants';
import getXGutterHeight from './getXGutterHeight';
import getYGutterWidth from './getYGutterWidth';
import type { ChartTypes } from '../../ChartHolder/types';

// * Calculates the space needed for the labels on the X and Y axis, then draws boundaries around the chart that leaves space for those labels
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  yAxisLabels: string[];
  chartType: ChartTypes;
  usableWidth: MutableRefObject<number>;
  usableHeight: MutableRefObject<number>;
  chartWidth: number;
  chartHeight: number;
}) => {
  newUsableWidth: number;
  newUsableHeight: number;
};

const defineUsableBoundaries: Signature = ({
  ctx,
  yAxisLabels,
  chartType,
  chartWidth,
  chartHeight,
}) => {
  const yGutter = getYGutterWidth({
    ctx,
    yAxisLabels,
    chartType,
  });
  const newUsableWidth = chartWidth - yGutter - usableBoundaryStrokeWidth;

  const { xGutter } = getXGutterHeight(ctx);
  const newUsableHeight = chartHeight - xGutter - usableBoundaryStrokeWidth;

  return { newUsableWidth, newUsableHeight };
};

export default defineUsableBoundaries;
