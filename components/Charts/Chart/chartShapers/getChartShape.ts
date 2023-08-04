import { Candle } from '@/__generated__/graphql';
import getChartBottom from './getChartBottom';
import getChartEnd from './getChartEnd';
import getChartStart from './getChartStart';
import getChartTop from './getChartTop';

const getChartShape = (candleData: Candle[]) => {
  const top = getChartTop(candleData);
  const bottom = getChartBottom(candleData);
  const start = getChartStart(candleData);
  const end = getChartEnd(candleData);

  return { top, bottom, start, end };
};

export default getChartShape;
