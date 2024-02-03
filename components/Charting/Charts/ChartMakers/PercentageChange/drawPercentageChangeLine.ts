import type { PercentageChangeSet } from '../../types';
import convertPercentageChangeValuesToDataPoints from './convertPercentageChangeValuesToDataPoints';
import convertToXYCoordinates from './convertToXYCoordinates';
import drawLineFromCoords from './drawLineFromCoords';
import setLineStyles from './setLineStyles';

// * Draws the line for a set of percentageChanges on our chart
type Signature = (dataObj: {
  percentageChangeSet: PercentageChangeSet;
  changeSetIndex: number;
  usableWidth: number;
  usableHeight: number;
  chartTop: number;
  chartBottom: number;
  ctx: CanvasRenderingContext2D;
}) => void;

const drawPercentageChangeLine: Signature = ({
  percentageChangeSet: { symbol, changes },
  changeSetIndex,
  usableWidth,
  usableHeight,
  chartTop,
  chartBottom,
  ctx,
}) => {
  const { computedColor, lineWidth } = setLineStyles({
    symbol,
    changeSetIndex,
  });

  const dataPoints = convertPercentageChangeValuesToDataPoints(
    changes,
    usableWidth
  );
  const xyPairs = convertToXYCoordinates({
    dataPoints,
    usableHeight,
    usableWidth,
    chartTop,
    chartBottom,
  });

  drawLineFromCoords({
    coords: xyPairs,
    ctx,
    color: computedColor,
    lineWidth,
  });
};

export default drawPercentageChangeLine;
