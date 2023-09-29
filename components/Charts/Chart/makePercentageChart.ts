import { Dispatch, SetStateAction } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';
import { ChartData } from './types';
import convertPercentageChangeValuesToPoints from './drawMovingAverageLine/convertPercentageChangeValuesToPoints';
import convertToXYPairs from './drawMovingAverageLine/convertToXYPairs';
import drawLineFromCoords from './utils/drawLineFromCoords';
import labelPercentageChart from './legendMakers/labelPercentageChart';
import getLineColor from './utils/getLineColor';

interface PercentageChartInterface {
  chartData: ChartData;
  data: PercentageChanges[];
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>;
}

const makePercentageChart = ({
  chartData,
  data,
  setLegendElements,
}: PercentageChartInterface) => {
  data.forEach((changes, index) => {
    const color = getLineColor(changes.symbol, index);
    const dataPoints = convertPercentageChangeValuesToPoints(
      changes.values,
      chartData.usableWidth
    );
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
