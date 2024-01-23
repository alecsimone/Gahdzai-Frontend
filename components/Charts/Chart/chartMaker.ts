import makeGrid from './gridMakers/makeGrid';
import getUsableHeight from './utils/getUsableHeight';
import getUsableWidth from './utils/getUsableWidth';
import {
  type ChartData,
  type DataPoint,
  type ChartMakerInterface,
  type ChartSize,
} from './types';
import makeCandlestickChart from './makeCandlestickChart';
import makePercentageChart from './makePercentageChart';
import getChartBoundaries from './chartShapers/getChartBoundaries';
import setLegendGridProperties from './legendMakers/setLegendGridProperties';
import setChartBasics from './utils/setChartBasics';

// * The master function for making our chart. It handles:
// - setting up the chart
// - making the grid
// - drawing the chart
// - creating the legend
// - It also has to return the chartSize (the usableWidth and usableHeight), because those values aren't known until it's done its business with labeling the axes

type Signature = (dataObj: ChartMakerInterface) => ChartSize;

const chartMaker: Signature = (dataObj) => {
  const { isChartOK, ctx, width, height, chartProps } = setChartBasics(dataObj);
  if (!isChartOK) return false;

  const { chartRef, chartType, data, setLegendElements, highlightedSymbols } =
    dataObj;

  const chartBoundaries = getChartBoundaries(chartProps);
  const usableHeight = getUsableHeight(height, ctx);
  const usableWidth = getUsableWidth({
    width,
    ctx,
    chartBoundaries,
    chartType,
  });

  const chartData: ChartData = {
    ctx,
    usableWidth,
    usableHeight,
    chartBoundaries,
    chartType,
  };

  let finalDatapoints: DataPoint[] = [];
  if (chartType === 'Candlestick') {
    finalDatapoints = makeCandlestickChart({
      data,
      chartData,
      setLegendElements,
    });
  } else if (chartType === 'PercentChange') {
    finalDatapoints = makePercentageChart({
      data,
      chartData,
      setLegendElements,
      highlightedSymbols,
    });
  }
  makeGrid(chartData, finalDatapoints);

  setLegendGridProperties(chartRef.current!); // isChartOK confirms that chartRef.current is not null

  return {
    usableHeight,
    usableWidth,
  };
};

export default chartMaker;
