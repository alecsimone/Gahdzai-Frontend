import { usableBoundaryStrokeWidth } from '../constants';
import getXGutterHeight from './getXGutterHeight';
import getYGutterWidth from './getYGutterWidth';

// * Calculates the space needed for the labels on the X and Y axis, then draws boundaries around the chart that leaves space for those labels
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  yAxisLabels: string[];
  labelDecorator: string;
  chartWidth: number;
  chartHeight: number;
}) => {
  newUsableWidth: number;
  newUsableHeight: number;
};

const defineUsableBoundaries: Signature = ({
  ctx,
  yAxisLabels,
  labelDecorator,
  chartWidth,
  chartHeight,
}) => {
  const yGutter = getYGutterWidth({
    ctx,
    yAxisLabels,
    labelDecorator,
  });
  const newUsableWidth = chartWidth - yGutter - usableBoundaryStrokeWidth;

  const { xGutter } = getXGutterHeight(ctx);
  const newUsableHeight = chartHeight - xGutter - usableBoundaryStrokeWidth;

  return { newUsableWidth, newUsableHeight };
};

export default defineUsableBoundaries;
