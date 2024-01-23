import { type ChartData, type DataPoint, type Coordinate } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getXValueByIndex from '../utils/getXValueByIndex';

// * Maps over an array of datapoints and turns them into XY Coordinates for the provided chart
type Signature = (
  dataPoints: DataPoint[],
  chartData: ChartData
) => Coordinate[];

const convertToXYCoordinates: Signature = (dataPoints, chartData) => {
  const xyCoordinates = dataPoints.map((dataPoint, index) => {
    const { value } = dataPoint;
    const xyCoordinate = {
      x: getXValueByIndex(chartData.usableWidth, index, dataPoints.length),
      y: getCoordForValue(
        value,
        chartData.usableHeight,
        chartData.chartBoundaries.chartTop,
        chartData.chartBoundaries.chartBottom
      ),
    };
    return xyCoordinate;
  });

  return xyCoordinates;
};

export default convertToXYCoordinates;
