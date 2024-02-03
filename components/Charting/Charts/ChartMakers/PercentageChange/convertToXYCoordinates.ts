import getXCoordByIndex from '../../DataPlotters/getXCoordByIndex';
import getYCoordByValue from '../../DataPlotters/getYCoordByValue';
import type { Coordinate, DataPoint } from '../../types';

// * Maps over an array of datapoints and turns them into XY Coordinates for the provided chart
type Signature = (dataObj: {
  dataPoints: DataPoint[];
  usableHeight: number;
  usableWidth: number;
  chartTop: number;
  chartBottom: number;
}) => Coordinate[];

const convertToXYCoordinates: Signature = ({
  dataPoints,
  usableHeight,
  usableWidth,
  chartTop,
  chartBottom,
}) => {
  const xyCoordinates = dataPoints.map((dataPoint, dataPointIndex) => {
    const { value } = dataPoint;
    const xyCoordinate = {
      x: getXCoordByIndex(usableWidth, dataPointIndex, dataPoints.length),
      y: getYCoordByValue({
        value,
        usableHeight,
        chartTop,
        chartBottom,
      }),
    };
    return xyCoordinate;
  });

  return xyCoordinates;
};

export default convertToXYCoordinates;
