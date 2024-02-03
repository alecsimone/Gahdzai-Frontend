import { gutterPadding } from '../constants';
import getWidestLabelWidth from './getWidestLabelWidth';

// * Gets the width of the right-side gutter in which the Y axis labels will live
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  yAxisLabels: string[];
  labelDecorator: string;
}) => number;

const getYGutterWidth: Signature = ({ ctx, yAxisLabels, labelDecorator }) => {
  const longestYLabelWidth = getWidestLabelWidth(
    ctx,
    yAxisLabels,
    labelDecorator
  );

  const yGutter = Math.ceil(longestYLabelWidth) + 2 * gutterPadding;
  return yGutter;
};

export default getYGutterWidth;
