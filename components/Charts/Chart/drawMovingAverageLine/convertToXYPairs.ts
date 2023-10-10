import { ChartData, DataPoint } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getXValueByIndex from '../utils/getXValueByIndex';

const convertToXYPairs = (dataPoints: DataPoint[], chartData: ChartData) => {
  const xyPairs = dataPoints.map((dataPoint, index) => {
    const { value } = dataPoint;
    const xyPair = {
      x: getXValueByIndex(chartData.usableWidth, index, dataPoints.length),
      // x: getCoordForValue(
      //   parseInt(time, 10),
      //   chartData.usableWidth,
      //   chartData.chartBoundaries.chartStart,
      //   chartData.chartBoundaries.chartEnd
      // ),
      y: getCoordForValue(
        value,
        chartData.usableHeight,
        chartData.chartBoundaries.chartTop,
        chartData.chartBoundaries.chartBottom
      ),
    };
    return xyPair;
  });

  return xyPairs;
};

export default convertToXYPairs;
