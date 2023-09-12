import { DirectionalChartData } from '../types';

const getChartShapeFromChartData = (
  directionalChartData: DirectionalChartData
) => {
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
