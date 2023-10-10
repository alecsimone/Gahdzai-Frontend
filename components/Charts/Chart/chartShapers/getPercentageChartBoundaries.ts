import { ChartBoundaries, ChartProps, PercentageChanges } from '../types';
import getDataTop from './getDataTop';
import getDataBottom from './getDataBottom';
import getDataStart from './getDataStart';
import getDataEnd from './getDataEnd';

const getPercentageChartBoundaries = (data: PercentageChanges[]) => {
  const chartProps: ChartProps = {
    data,
    chartType: 'PercentChange',
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

export default getPercentageChartBoundaries;
