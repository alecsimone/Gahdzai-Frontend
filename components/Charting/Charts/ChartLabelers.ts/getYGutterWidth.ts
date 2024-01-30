import { gutterPadding } from '../constants';
import getWidestLabelWidth from './getWidestLabelWidth';
import type { ChartTypes } from '../../ChartHolder/types';

// * Gets the width of the right-side gutter in which the Y axis labels will live
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  yAxisLabels: string[];
  chartType: ChartTypes;
}) => number;

const getYGutterWidth: Signature = ({ ctx, yAxisLabels, chartType }) => {
  const longestYLabelWidth = getWidestLabelWidth(
    ctx,
    yAxisLabels,
    chartType === 'Comparison' ? '%' : ''
  );

  const yGutter = Math.ceil(longestYLabelWidth) + 2 * gutterPadding;
  return yGutter;
};

export default getYGutterWidth;
