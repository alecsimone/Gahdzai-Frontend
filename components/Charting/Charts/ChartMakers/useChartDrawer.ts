import { useEffect } from 'react';
import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  PercentageChangeSet,
  UsableBoundaries,
} from '../types';
import drawChart from './drawChart';
import type { ChartTypes } from '../../ChartHolder/types';
import type { HighlightedSymbols } from '../../ChartHolder/LegendElements/HighlightContextTypes';

// * Draws our chart, and sets up a resize listener to redraw it

// - Note that we need to do it this way so the chart doesn't disappear when the mobile firefox toolbar shows and hides. That triggers a resize event, but it doesn't trigger a state update because it does not actually change the size of the window, so the state stays the same
type Signature = (dataObj: {
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  chartType: ChartTypes;
  ctx: CanvasRenderingContext2D | null | undefined;
  chartDataRange: ChartDataRange;
  highlightedSymbols: HighlightedSymbols[];
  coordinatedData: CoordinatedDataPoint[];
}) => void;

const useChartDrawer: Signature = ({
  data,
  usableBoundaries,
  chartType,
  ctx,
  chartDataRange,
  highlightedSymbols,
  coordinatedData,
}) => {
  if (
    ctx &&
    usableBoundaries.usableHeight.current > 0 &&
    usableBoundaries.usableWidth.current > 0
  ) {
    drawChart({
      data,
      usableBoundaries,
      chartType,
      ctx,
      chartDataRange,
      highlightedSymbols,
      coordinatedData,
    });
  }

  useEffect(() => {
    if (ctx == null) {
      return () => {};
    }

    const drawChartHandler = () => {
      drawChart({
        data,
        usableBoundaries,
        chartType,
        ctx,
        chartDataRange,
        highlightedSymbols,
        coordinatedData,
      });
    };

    if (ctx) {
      window.addEventListener('resize', drawChartHandler);
    }

    return () => {
      window.removeEventListener('resize', drawChartHandler);
    };
  }, [
    chartDataRange,
    chartType,
    coordinatedData,
    ctx,
    data,
    highlightedSymbols,
    usableBoundaries,
  ]);
};

export default useChartDrawer;
