import makeNumberReadable from '@/utils/makeNumberReadable';
import { ChartBoundaries, ChartTypes } from '../types';
import { gutterPadding } from '../constants';

interface UsableWidthCalculator {
  width: number;
  ctx: CanvasRenderingContext2D;
  chartBoundaries: ChartBoundaries;
  chartType: ChartTypes;
}

const getUsableWidth = (dataObj: UsableWidthCalculator) => {
  const {
    width,
    ctx,
    chartBoundaries: { chartTop, chartBottom },
    chartType,
  } = dataObj;

  const top = makeNumberReadable({ number: chartTop });
  let topString = `${top}`;
  if (!topString.includes('.')) {
    topString = `${topString}.00`;
  }
  if (chartType === 'PercentChange') {
    topString += '%';
  }

  const bottom = makeNumberReadable({ number: chartBottom });
  let bottomString = `${bottom}`;
  if (!bottomString.includes('.')) {
    bottomString = `${bottomString}.00`;
  }
  if (chartType === 'PercentChange') {
    bottomString += '%';
  }

  const topStringWidth = ctx.measureText(topString).width;
  const bottomStringWidth = ctx.measureText(bottomString).width;

  const longerStringWidth =
    topStringWidth >= bottomStringWidth ? topStringWidth : bottomStringWidth;

  const verticalGutter = longerStringWidth + 1.5 * gutterPadding;

  return width - verticalGutter;
};

export default getUsableWidth;
