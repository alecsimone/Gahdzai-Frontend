import getOneRem from '@/styles/functions/getOneRem';
import getTotalHeight from '@/utils/getTotalHeight';

const setChartSize = (chartElement: HTMLCanvasElement) => {
  const oneRem = getOneRem();

  const parent = chartElement.parentElement;
  if (parent != null) {
    const header = parent.querySelector('header');
    const headerHeight = getTotalHeight(header);

    const chartWidth = parent.clientWidth - 4 * oneRem;
    const chartHeight = parent.clientHeight - headerHeight - oneRem;
    console.log({
      parentHeight: parent.clientHeight,
      headerHeight,
      chartHeight,
    });

    const chartEl = chartElement; // Creating a reference to the element prop to avoid modifying a prop directly
    chartEl.width = chartWidth;
    chartEl.height = chartHeight;
  }
};

export default setChartSize;
