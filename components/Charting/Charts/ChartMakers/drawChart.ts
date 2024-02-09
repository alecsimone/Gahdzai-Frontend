import type {
  CandleSet,
  ChartDataRange,
  CoordinatedDataPoint,
  PercentageChangeSet,
  UsableBoundaries,
} from '../types';
import type { ChartTypes } from '../../ChartHolder/types';
import makePercentageChangeChart from './PercentageChange/makePercentageChangeChart';
import type { HighlightedSymbols } from '../../ChartHolder/LegendElements/HighlightContextTypes';
import makeCandlestickChart from './Candlestick/makeCandlestickChart';

// * A wrapper function that determines what kind of chart we're drawing and calls the corresponding chart drawing function
type Signature = (dataObj: {
  data: CandleSet | PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  chartType: ChartTypes;
  ctx: CanvasRenderingContext2D;
  chartDataRange: ChartDataRange;
  highlightedSymbols: HighlightedSymbols[];
  coordinatedData: CoordinatedDataPoint[];
}) => void;

const drawChart: Signature = ({
  data,
  usableBoundaries,
  chartType,
  ctx,
  chartDataRange,
  highlightedSymbols,
  coordinatedData,
}) => {
  if (chartType === 'Comparison' && Array.isArray(data)) {
    makePercentageChangeChart({
      data,
      chartDataRange,
      ctx,
      usableBoundaries,
      highlightedSymbols,
      coordinatedData,
    });
    return;
  }
  if (chartType === 'Individual' && !Array.isArray(data)) {
    makeCandlestickChart({
      data,
      usableBoundaries,
      chartDataRange,
      ctx,
      coordinatedData,
    });
  }
};

export default drawChart;
