import type {
  CandleSet,
  ChartDataRange,
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
}) => void;

const drawChart: Signature = ({
  data,
  usableBoundaries,
  chartType,
  ctx,
  chartDataRange,
  highlightedSymbols,
}) => {
  console.log('drawing the chart');
  if (chartType === 'Comparison' && !('candles' in data)) {
    makePercentageChangeChart({
      data,
      chartDataRange,
      ctx,
      usableBoundaries,
      highlightedSymbols,
    });
    return;
  }
  if (chartType === 'Individual' && 'candles' in data) {
    makeCandlestickChart({
      data,
      usableBoundaries,
      chartDataRange,
      ctx,
    });
  }
};

export default drawChart;
