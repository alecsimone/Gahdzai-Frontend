import getTextHeight from '../ChartStylers.ts/getTextHeight';
import { gutterPadding } from '../constants';

// * Gets the height of the bottom gutter in which the X-axis labels will live
type Signature = (ctx: CanvasRenderingContext2D) => {
  xGutter: number;
  labelTextHeight: number;
};

const getXGutterHeight: Signature = (ctx) => {
  const labelTextHeight = getTextHeight(ctx);
  const xGutter = labelTextHeight + 1.5 * gutterPadding;
  return { xGutter, labelTextHeight };
};

export default getXGutterHeight;
