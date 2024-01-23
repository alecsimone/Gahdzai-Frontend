import { ChartData, DataPoint } from '../types';
import drawLineFromCoords from '../utils/drawLineFromCoords';
import convertDataPointsToSMAPoints from './convertDataPointsToSMAPoints';
import convertToXYCoordinates from './convertToXYCoordinates';

const drawMovingAverageLine = (
  dataPoints: DataPoint[],
  chartData: ChartData,
  ctx: CanvasRenderingContext2D
) => {
  // Get a list of SMA value pairs from the dataPoints
  const smaPoints = convertDataPointsToSMAPoints(dataPoints);

  // Convert the SMA value pairs to XY pairs
  const smaXYPairs = convertToXYCoordinates(smaPoints, chartData);

  // Plot a line between the pairs
  drawLineFromCoords({ coords: smaXYPairs, ctx, lineWidth: 4 });
};

export default drawMovingAverageLine;
