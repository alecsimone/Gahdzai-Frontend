import type { ChartDataRange, ChartSize } from '../types';
import getXLabels from './getXLabels';
import getYLabels from './getYLabels';

// * Creates an object containing all the labels we'll be using for this chart's two axes
interface ChartAxisLabels {
  xLabels: string[];
  yLabels: string[];
}

type Signature = (
  chartDataRange: ChartDataRange,
  chartSize: ChartSize
) => ChartAxisLabels;

const getAxisLabels: Signature = (
  { chartStart, chartEnd, chartBottom, chartTop },
  chartSize
) => {
  const xLabels = getXLabels(chartStart, chartEnd, chartSize.chartWidth);
  const yLabels = getYLabels(chartBottom, chartTop, chartSize.chartHeight);

  return {
    xLabels,
    yLabels,
  };
};

export default getAxisLabels;
