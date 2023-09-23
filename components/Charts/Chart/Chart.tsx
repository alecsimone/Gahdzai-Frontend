import { ChartQueryProps, ChartProps } from './types';
import StyledChart from './StyledChart';
import useChart from './useChart';

const Chart = ({
  data,
  chartType,
}: ChartQueryProps): JSX.Element | undefined => {
  let dataObj: ChartProps;
  if (chartType === 'Candlestick') {
    dataObj = {
      data: data.getCandles,
      chartType,
    };
  } else {
    dataObj = {
      data: data.getAllIndexData,
      chartType,
    };
  }

  const chartRef = useChart(dataObj);
  return <StyledChart ref={chartRef}>A chart</StyledChart>;
};

export default Chart;
