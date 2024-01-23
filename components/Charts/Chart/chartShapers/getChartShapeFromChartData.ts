import { type DirectionalChartData } from '../types';

// * This function helps us work out the relevant data points of our chart given its direction in an abstract way. IE, instead of getting usableWidth we get usablePixelSize, so that it is the right value for a horizontal or vertical chart
type Signature = (DirectionalChartData: DirectionalChartData) => {
  usablePixelSize: number; // usableWidth or usableHeight depending on direction
  lineTerminus: number; // The other one. ie, the coordinate at which a line going in this direction would end
  chartOrigin: number; // The starting value of the chart
  chartTerminus: number; // The ending value of the chart
};

const getChartShapeFromChartData: Signature = (directionalChartData) => {
  const { chartData, lineDirection } = directionalChartData;
  const { usableHeight, usableWidth, chartBoundaries } = chartData;

  const usablePixelSize =
    lineDirection === 'horizontal' ? usableHeight : usableWidth;
  const lineTerminus =
    lineDirection === 'horizontal' ? usableWidth : usableHeight;

  const chartOrigin =
    lineDirection === 'horizontal'
      ? chartBoundaries.chartTop
      : chartBoundaries.chartStart;
  const chartTerminus =
    lineDirection === 'horizontal'
      ? chartBoundaries.chartBottom
      : chartBoundaries.chartEnd;

  return {
    usablePixelSize,
    lineTerminus,
    chartOrigin,
    chartTerminus,
  };
};

export default getChartShapeFromChartData;
