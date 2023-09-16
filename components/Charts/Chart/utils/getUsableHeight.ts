import { gutterPadding } from '../constants';

const getUsableHeight = (height: number, ctx: CanvasRenderingContext2D) => {
  const textMeasurement = ctx.measureText('test');
  const textHeight =
    textMeasurement.fontBoundingBoxAscent +
    textMeasurement.fontBoundingBoxDescent;

  const horizontalGutter = textHeight + 1.5 * gutterPadding;

  return height - horizontalGutter;
};

export default getUsableHeight;
