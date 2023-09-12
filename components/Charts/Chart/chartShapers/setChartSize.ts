import getOneRem from '@/styles/functions/getOneRem';

const setChartSize = (chartElement: HTMLCanvasElement) => {
  const oneRem = getOneRem();

  const parent = chartElement.parentElement;
  if (parent != null) {
    const chartWidth = parent.clientWidth - 4 * oneRem;
    const chartHeight = parent.clientHeight - 4 * oneRem;

    const chartEl = chartElement; // Creating a reference to the element prop to avoid modifying a prop directly
    chartEl.width = chartWidth;
    chartEl.height = chartHeight;
  }
};

export default setChartSize;
