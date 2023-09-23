/* eslint-disable prefer-destructuring */
import { PercentageChanges } from '@/__generated__/graphql';
import { ChartData } from './types';
import convertPercentageChangeValuesToPoints from './drawMovingAverageLine/convertPercentageChangeValuesToPoints';
import convertToXYPairs from './drawMovingAverageLine/convertToXYPairs';
import drawLineFromCoords from './utils/drawLineFromCoords';

interface PercentageChartInterface {
  chartData: ChartData;
  data: PercentageChanges[];
}

const colors = [
  'hsl(210, 100%, 60%)', // Blue
  'hsl(270, 100%, 60%)', // Purple
  'hsl(30, 100%, 60%)', // Orange
  'hsl(0, 0%, 90%)', // White
  'hsl(120, 80%, 60%)', // Green
  'hsl(180, 100%, 60%)', // Teal
  'hsl(0, 80%, 40%)', // Red
];

const makePercentageChart = ({ chartData, data }: PercentageChartInterface) => {
  data.forEach((changes, index) => {
    // const computedColor = colors[index];
    let computedColor: string;
    switch (changes.symbol) {
      case 'SPX':
        computedColor = colors[0];
        break;
      case 'DJI':
        computedColor = colors[4];
        break;
      case 'COMP':
        computedColor = colors[1];
        break;
      case 'RUT':
        computedColor = colors[2];
        break;
      default:
        computedColor = colors[index];
    }
    const dataPoints = convertPercentageChangeValuesToPoints(changes.values);
    const xyPairs = convertToXYPairs(dataPoints, chartData);
    drawLineFromCoords(xyPairs, chartData.ctx, computedColor);
  });
};

export default makePercentageChart;
