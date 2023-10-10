import { Dispatch, SetStateAction } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { ChartData, PercentageChanges, DataPoint } from './types';
import convertPercentageChangeValuesToPoints from './drawMovingAverageLine/convertPercentageChangeValuesToPoints';
import convertToXYPairs from './drawMovingAverageLine/convertToXYPairs';
import drawLineFromCoords from './utils/drawLineFromCoords';
import labelPercentageChart from './legendMakers/labelPercentageChart';
import getLineColor from './utils/getLineColor';
import { HighlightedSymbols } from '../ChartHolder/Contexts/HighlightContext';

interface PercentageChartInterface {
  chartData: ChartData;
  data: PercentageChanges[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
  highlightedSymbols: HighlightedSymbols[];
}

const makePercentageChart = ({
  chartData,
  data,
  setLegendElements,
  highlightedSymbols,
}: PercentageChartInterface): DataPoint[] => {
  let dataPoints: DataPoint[] = [];
  data.forEach((changes, index) => {
    const color = getLineColor(changes.symbol, index);
    dataPoints = convertPercentageChangeValuesToPoints(
      changes.values,
      chartData.usableWidth
    );
    let computedColor = setAlpha(color, 0.8);
    let lineWidth = 3;
    if (highlightedSymbols.length > 0) {
      const symbolIndex = highlightedSymbols.findIndex(
        (obj) => obj.symbol === changes.symbol
      );
      const isHighlighted = symbolIndex !== -1;
      computedColor = isHighlighted
        ? setAlpha(color, 1)
        : setAlpha(color, 0.25);
      lineWidth = isHighlighted ? 5 : 1;
    }
    const xyPairs = convertToXYPairs(dataPoints, chartData);
    drawLineFromCoords({
      coords: xyPairs,
      ctx: chartData.ctx,
      color: computedColor,
      lineWidth,
    });
  });
  labelPercentageChart(setLegendElements, data);

  return dataPoints;
};

export default makePercentageChart;
