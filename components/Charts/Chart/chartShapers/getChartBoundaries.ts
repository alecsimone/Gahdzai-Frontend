import getCandleChartBoundaries from './getCandleChartBoundaries';
import getPercentageChartBoundaries from './getPercentageChartBoundaries';
import { type ChartBoundaries, type ChartProps } from '../types';

// * Just a wrapper function that decides which chartBoundaries getter we need to use depending on which chartType we're using
type Signature = ({ data, chartType }: ChartProps) => ChartBoundaries;

const getChartBoundaries: Signature = ({ data, chartType }) => {
  if (chartType === 'Candlestick') {
    return getCandleChartBoundaries(data);
  }
  if (chartType === 'PercentChange') {
    return getPercentageChartBoundaries(data);
  }

  return null as unknown as ChartBoundaries;
};

export default getChartBoundaries;
