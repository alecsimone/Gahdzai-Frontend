import { ChartQueryProps } from './types';
import StyledChart from './StyledChart';
import useChart, { ChartInterface } from './useChart';

// * Our main Chart component. Its responsibility is to render the data we receive from our query as a chart, which it splits into two parts: The main Chart canvas, which will have the actual chart, and then a ShadowChart canvas that will hold any annotations on that chart, eg the crosshairs that follow the mouse

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
        A shadow chart for annotating the main chart
      </StyledChart>
    </div>
  );
};

export default Chart;
