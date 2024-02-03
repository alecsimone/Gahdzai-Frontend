import type { HighlightedSymbols } from '../../../ChartHolder/LegendElements/HighlightContextTypes';
import type {
  ChartDataRange,
  PercentageChangeSet,
  UsableBoundaries,
} from '../../types';
import drawPercentageChangeLine from './drawPercentageChangeLine';

// * Loops through the data in our PercentageChangeSet array and plots it on our chart, then creates the legend elements for the chart and puts them into the state passed down from the ChartHolder
type Signature = (dataObj: {
  data: PercentageChangeSet[];
  usableBoundaries: UsableBoundaries;
  ctx: CanvasRenderingContext2D;
  chartDataRange: ChartDataRange;
  highlightedSymbols: HighlightedSymbols[];
}) => void;

const makePercentageChangeChart: Signature = ({
  data,
  usableBoundaries: { usableWidth, usableHeight },
  chartDataRange: { chartBottom, chartTop },
  ctx,
  highlightedSymbols,
}) => {
  data.forEach((percentageChangeSet, changeSetIndex) => {
    drawPercentageChangeLine({
      percentageChangeSet,
      changeSetIndex,
      usableWidth: usableWidth.current,
      usableHeight: usableHeight.current,
      chartBottom,
      chartTop,
      ctx,
      highlightedSymbols,
    });
  });
};

export default makePercentageChangeChart;
