import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import getLineColor from './utils/getLineColor';
import {
  defaultLineAlpha,
  defaultLineWidth,
  highlightedLineWidth,
  highlightedSymbolAlpha,
  notHighlightedLineWidth,
  notHighlightedSymbolAlpha,
} from './constants';
import convertPercentageChangeValuesToPoints from './drawMovingAverageLine/convertPercentageChangeValuesToPoints';
import convertToXYCoordinates from './drawMovingAverageLine/convertToXYCoordinates';
import drawLineFromCoords from './utils/drawLineFromCoords';
import type { ChartData, PercentageChanges, DataPoint } from './types';
import type { HighlightedSymbols } from '../ChartHolder/Contexts/HighlightContext';

// * Takes in a set of PercentageChanges and chartData and draws a line representing those changes on that chart
type Signature = (
  changes: PercentageChanges,
  index: number,
  highlightedSymbols: HighlightedSymbols[],
  chartData: ChartData
) => DataPoint[];

const drawPercentageChangesLineChart: Signature = (
  changes,
  index,
  highlightedSymbols,
  chartData
) => {
  let dataPoints: DataPoint[] = [];
  // Set up line styling
  const color = getLineColor({ symbol: changes.symbol, index });
  let computedColor = setAlpha(color, defaultLineAlpha);
  let lineWidth = defaultLineWidth;

  // If there are highlighted symbols, we might have to tweak that styling
  if (highlightedSymbols.length > 0) {
    const symbolIndex = highlightedSymbols.findIndex(
      (highlightedSymbolObj) => highlightedSymbolObj.symbol === changes.symbol
    );
    const isHighlighted = symbolIndex !== -1;

    computedColor = isHighlighted
      ? setAlpha(color, highlightedSymbolAlpha)
      : setAlpha(color, notHighlightedSymbolAlpha);
    lineWidth = isHighlighted ? highlightedLineWidth : notHighlightedLineWidth;
  }

  // Then we have to convert our PercentageChangeValues into an array of XY coordinates
  dataPoints = convertPercentageChangeValuesToPoints(
    changes.values,
    chartData.usableWidth
  );
  const xyPairs = convertToXYCoordinates(dataPoints, chartData);

  // And finally we can draw a line through all those coordinates
  drawLineFromCoords({
    coords: xyPairs,
    ctx: chartData.ctx,
    color: computedColor,
    lineWidth,
  });

  return dataPoints;
};

export default drawPercentageChangesLineChart;
