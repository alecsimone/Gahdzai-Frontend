import { Candle } from '@/__generated__/graphql';
import getDataBottom from './getDataBottom';
import getDataEnd from './getDataEnd';
import getDataStart from './getDataStart';
import getDataTop from './getDataTop';
import { ChartBoundaries } from '../types';

const getChartBoundaries = (candleData: Candle[]) => {
  const chartTop = getDataTop(candleData);
  const chartBottom = getDataBottom(candleData);
  const chartStart = getDataStart(candleData);
  const chartEnd = getDataEnd(candleData);

  const chartBoundaries: ChartBoundaries = {
    chartTop,
    chartBottom,
    chartStart: parseInt(chartStart, 10),
    chartEnd: parseInt(chartEnd, 10),
  };

  return chartBoundaries;
};

export default getChartBoundaries;
