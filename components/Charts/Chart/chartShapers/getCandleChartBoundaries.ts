import { type Candle } from '@/__generated__/graphql';
import getDataTop from './getDataTop';
import getDataBottom from './getDataBottom';
import getDataStart from './getDataStart';
import getDataEnd from './getDataEnd';
import { type ChartBoundaries, type ChartProps } from '../types';

const getCandleChartBoundaries = (candleData: Candle[]) => {
  const chartProps: ChartProps = {
    data: candleData,
    chartType: 'Candlestick',
  };

  const chartTop = getDataTop(chartProps);
  const chartBottom = getDataBottom(chartProps);
  const chartStart = getDataStart(chartProps);
  const chartEnd = getDataEnd(chartProps);

  const chartBoundaries: ChartBoundaries = {
    chartTop,
    chartBottom,
    chartStart: parseInt(chartStart, 10),
    chartEnd: parseInt(chartEnd, 10),
  };

  return chartBoundaries;
};

export default getCandleChartBoundaries;
