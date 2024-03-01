import { scaleFactor } from '../constants';

// * Sets the inline width and height of the chart so that it will be properly scaled to its contents
type Signature = (chartElement: HTMLCanvasElement) => {
  chartWidth: number;
  chartHeight: number;
};

const setChartSize: Signature = (chartElement) => {
  const container = chartElement.closest('.chartContainer');
  if (container == null) return { chartWidth: 0, chartHeight: 0 };
  const chartEl = chartElement;

  chartEl.width = container.clientWidth * scaleFactor;
  chartEl.height = container.clientHeight * scaleFactor;

  return { chartWidth: chartEl.width, chartHeight: chartEl.height };
};

export default setChartSize;
