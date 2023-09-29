import { ChartQueryProps, ChartProps } from './types';
import StyledChart from './StyledChart';
import useChart from './useChart';

const Chart = ({
  data,
  chartType,
  setLegendElements,
  highlightedSymbols,
  setHighlightedSymbols,
}: ChartQueryProps): JSX.Element | undefined => {
  let dataObj: ChartProps;
  if (chartType === 'Candlestick') {
    dataObj = {
      data: data.getCandles,
      chartType,
      setLegendElements,
      highlightedSymbols,
      setHighlightedSymbols,
    };
  } else {
    dataObj = {
      data: data.getAllIndexData,
      chartType,
      setLegendElements,
      highlightedSymbols,
      setHighlightedSymbols,
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
