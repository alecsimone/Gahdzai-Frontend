// * Sets the inline width and height of the chart so that it will be properly scaled to its contents
type Signature = (chartElement: HTMLCanvasElement) => void;

const setChartSize: Signature = (chartElement) => {
  const container = chartElement.closest('.chartContainer');
  if (container == null) return;
  const chartEl = chartElement;

  chartEl.width = container.clientWidth;
  chartEl.height = container.clientHeight;
};

export default setChartSize;
