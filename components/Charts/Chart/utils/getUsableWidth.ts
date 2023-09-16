import makeSafeDecimals from '@/utils/makeSafeDecimals';
import { ChartBoundaries } from '../types';
import { gutterPadding } from '../constants';

interface UsableWidthCalculator {
  width: number;
  ctx: CanvasRenderingContext2D;
  chartBoundaries: ChartBoundaries;
}

const getUsableWidth = (dataObj: UsableWidthCalculator) => {
  const {
    width,
    ctx,
    chartBoundaries: { chartTop, chartBottom },
  } = dataObj;

  const top = makeSafeDecimals(chartTop);
  let topString = `${top}`;
  if (!topString.includes('.')) {
    topString = `${topString}.00`;
  }

  const bottom = makeSafeDecimals(chartBottom);
  let bottomString = `${bottom}`;
  if (!bottomString.includes('.')) {
    bottomString = `${bottomString}.00`;
  }

  const topStringWidth = ctx.measureText(topString).width;
  const bottomStringWidth = ctx.measureText(bottomString).width;

  const longerStringWidth =
    topStringWidth >= bottomStringWidth ? topStringWidth : bottomStringWidth;

  const verticalGutter = longerStringWidth + 1.5 * gutterPadding;

  return width - verticalGutter;
};

export default getUsableWidth;
