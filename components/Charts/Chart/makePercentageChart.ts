import { Dispatch, SetStateAction, ReactNode } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';
import { ChartData } from './types';
import convertPercentageChangeValuesToPoints from './drawMovingAverageLine/convertPercentageChangeValuesToPoints';
import convertToXYPairs from './drawMovingAverageLine/convertToXYPairs';
import drawLineFromCoords from './utils/drawLineFromCoords';
import labelPercentageChart from './labelPercentageChart';
import getLineColor from './utils/getLineColor';

interface PercentageChartInterface {
  chartData: ChartData;
  data: PercentageChanges[];
  setLegendElements: Dispatch<SetStateAction<ReactNode[]>>;
}

const makePercentageChart = ({
  chartData,
  data,
  setLegendElements,
}: PercentageChartInterface) => {
  data.forEach((changes, index) => {
    // const computedColor = colors[index];
    const color = getLineColor(changes.symbol, index);
    const dataPoints = convertPercentageChangeValuesToPoints(changes.values);
    const xyPairs = convertToXYPairs(dataPoints, chartData);
    drawLineFromCoords({
      coords: xyPairs,
      ctx: chartData.ctx,
      color,
      lineWidth: 3,
    });
  });
  labelPercentageChart(setLegendElements, data);
};

export default makePercentageChart;
