import makeNumberReadable from '@/utils/makeNumberReadable';
import { type ChartBoundaries, type ChartTypes } from '../types';
import { gutterPadding } from '../constants';

// * Gets the usable width of a canvas for a chart, that is the space that is available for charting inside of the Y-axis and its labels.
// - The main problem here is figuring out how much space the y-axis label needs to take up, because the values for it are of variable length. As a shortcut to checking every value, we're just taking the first and the last and then adding a multiple of the normal gutter for safety.

type Signature = (dataObj: {
  width: number;
  ctx: CanvasRenderingContext2D;
  chartBoundaries: ChartBoundaries;
  chartType: ChartTypes;
}) => number;

const getUsableWidth: Signature = ({
  width,
  ctx,
  chartBoundaries: { chartTop, chartBottom },
  chartType,
}) => {
  let topString = makeNumberReadable({
    number: chartTop,
    minimumFractionDigits: 2,
  });
  if (chartType === 'PercentChange') {
    topString += '%';
  }

  let bottomString = makeNumberReadable({
    number: chartBottom,
    minimumFractionDigits: 2,
  });
  if (chartType === 'PercentChange') {
    bottomString += '%';
  }

  const topStringWidth = ctx.measureText(topString).width;
  const bottomStringWidth = ctx.measureText(bottomString).width;

  const longerStringWidth =
    topStringWidth >= bottomStringWidth ? topStringWidth : bottomStringWidth;

  const verticalGutter = longerStringWidth + 2 * gutterPadding;

  return width - verticalGutter;
};

export default getUsableWidth;
