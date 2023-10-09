import { ChartQueryProps } from './types';
import StyledChart from './StyledChart';
import useChart, { ChartInterface } from './useChart';

const Chart = ({
  data,
  chartType,
  setLegendElements,
}: ChartQueryProps): JSX.Element | undefined => {
  let dataObj: ChartInterface;
  if (chartType === 'Candlestick') {
    dataObj = {
      data: data.getCandles,
      chartType,
      setLegendElements,
    };
  } else {
    dataObj = {
      data: data.getAllIndexData,
      chartType,
      setLegendElements,
    };
  }

  const { chartRef, shadowChartRef } = useChart(dataObj);
  return (
    <div className="chartContainer">
      <StyledChart ref={chartRef}>A chart</StyledChart>
      <StyledChart ref={shadowChartRef} className="shadow">
        A shadow chart
      </StyledChart>
    </div>
  );
};

export default Chart;
