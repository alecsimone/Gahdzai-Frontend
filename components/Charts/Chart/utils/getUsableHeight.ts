import { gutterPadding } from '../constants';

// * Gets the usable height of a canvas for a chart, that is the space that is available for charting inside of the X-axis and its labels
type Signature = (height: number, ctx: CanvasRenderingContext2D) => number;

const getUsableHeight: Signature = (height, ctx) => {
  const textMeasurement = ctx.measureText('test');
  const textHeight =
    textMeasurement.fontBoundingBoxAscent +
    textMeasurement.fontBoundingBoxDescent;

  const horizontalGutter = textHeight + 1.5 * gutterPadding;

  return height - horizontalGutter;
};

export default getUsableHeight;
