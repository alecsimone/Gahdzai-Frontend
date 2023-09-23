import getCandleChartBoundaries from './getCandleChartBoundaries';
import getPercentageChartBoundaries from './getPercentageChartBoundaries';
import { ChartBoundaries, ChartProps } from '../types';

const getChartBoundaries = ({ data, chartType }: ChartProps) => {
  if (chartType === 'Candlestick') {
    return getCandleChartBoundaries(data);
  }
  if (chartType === 'PercentChange') {
    return getPercentageChartBoundaries(data);
  }

  return null as unknown as ChartBoundaries;
};

export default getChartBoundaries;
