import type { HighlightedSymbols } from '@/components/Charting/ChartHolder/LegendElements/HighlightContextTypes';
import type { CoordinatedDataPoint, PercentageChangeSet } from '../../types';
import convertPercentageChangeValuesToDataPoints from './convertPercentageChangeValuesToDataPoints';
import convertToXYCoordinates from '../../DataPlotters/convertToXYCoordinates';
import drawLineFromCoords from '../../DataPlotters/drawLineFromCoords';
import setLineStyles from './setLineStyles';

// * Draws the line for a set of percentageChanges on our chart
// - Note that we have an important side effect here of setting the coordinatedData ref value for this chart
type Signature = (dataObj: {
  percentageChangeSet: PercentageChangeSet;
  changeSetIndex: number;
  usableWidth: number;
  usableHeight: number;
  chartTop: number;
  chartBottom: number;
  ctx: CanvasRenderingContext2D;
  highlightedSymbols: HighlightedSymbols[];
  coordinatedData: CoordinatedDataPoint[];
}) => void;

const drawPercentageChangeLine: Signature = ({
  percentageChangeSet: { symbol, changes },
  changeSetIndex,
  usableWidth,
  usableHeight,
  chartTop,
  chartBottom,
  ctx,
  highlightedSymbols,
  coordinatedData,
}) => {
  const { computedColor, lineWidth } = setLineStyles({
    symbol,
    changeSetIndex,
    highlightedSymbols,
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

  dataPoints.forEach((point, index) => {
    const { x } = xyPairs[index]!;
    const { y } = xyPairs[index]!;
    const { time } = point;
    const change = point.value;

    const coordinatedDataPoint: CoordinatedDataPoint = {
      symbol,
      x,
      y,
      data: {
        time,
        change,
      },
    };

    const existingDataPointIndex = coordinatedData.findIndex(
      (cdp) => cdp.symbol === symbol && cdp.data.time === time
    );
    if (existingDataPointIndex === -1) {
      coordinatedData.push(coordinatedDataPoint);
    }
  });

  drawLineFromCoords({
    coords: xyPairs,
    ctx,
    color: computedColor,
    lineWidth,
  });
};

export default drawPercentageChangeLine;
