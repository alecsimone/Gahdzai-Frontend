// interface ChartProps {}

import StyledChart from './StyledChart';
import useChart from './useChart';

const Chart = (): JSX.Element => {
  const chartRef = useChart();
  return <StyledChart ref={chartRef}>A chart</StyledChart>;
};

export default Chart;
