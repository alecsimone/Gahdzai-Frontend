import convertToXYCoordinates from '../../DataPlotters/convertToXYCoordinates';
import drawLineFromCoords from '../../DataPlotters/drawLineFromCoords';
import type { DataPoint } from '../../types';
import convertDataPointsToSMAPoints from './convertDataPointsToSMAPoints';

type Signature = (dataObj: {
  dataPoints: DataPoint[];
  usableHeight: number;
  usableWidth: number;
  chartTop: number;
  chartBottom: number;
  ctx: CanvasRenderingContext2D;
}) => void;

const drawMovingAverageLine: Signature = ({
  dataPoints,
  usableHeight,
  usableWidth,
  chartTop,
  chartBottom,
  ctx,
}) => {
  // Get a list of SMA value pairs from the dataPoints
  const smaPoints = convertDataPointsToSMAPoints(dataPoints);

  // Convert the SMA value pairs to XY pairs
  const smaXYPairs = convertToXYCoordinates({
    dataPoints: smaPoints,
    usableHeight,
    usableWidth,
    chartTop,
    chartBottom,
  });

  // Plot a line between the pairs
  drawLineFromCoords({ coords: smaXYPairs, ctx, lineWidth: 4 });
};

export default drawMovingAverageLine;
