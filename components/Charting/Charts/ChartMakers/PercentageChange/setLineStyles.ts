import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import type { HighlightedSymbols } from '@/components/Charting/ChartHolder/LegendElements/HighlightContextTypes';
import {
  defaultLineAlpha,
  defaultLineWidth,
  highlightedLineWidth,
  highlightedSymbolAlpha,
  notHighlightedLineWidth,
  notHighlightedSymbolAlpha,
} from '../../constants';
import getLineColor from './getLineColor';

// * Sets up the styling for this percentageChangeLine
type Signature = (dataObj: {
  symbol: string;
  changeSetIndex: number;
  highlightedSymbols: HighlightedSymbols[];
}) => {
  computedColor: string;
  lineWidth: number;
};

const setLineStyles: Signature = ({
  symbol,
  changeSetIndex,
  highlightedSymbols,
}) => {
  const color = getLineColor({ symbol, lineIndex: changeSetIndex });
  let computedColor = setAlpha(color, defaultLineAlpha);
  let lineWidth = defaultLineWidth;

  // If there are highlighted symbols, we might have to tweak that styling
  if (highlightedSymbols.length > 0) {
    const symbolIndex = highlightedSymbols.findIndex(
      (highlightedSymbolObj) => highlightedSymbolObj.symbol === symbol
    );
    const isHighlighted = symbolIndex !== -1;

    computedColor = isHighlighted
      ? setAlpha(color, highlightedSymbolAlpha)
      : setAlpha(color, notHighlightedSymbolAlpha);
    lineWidth = isHighlighted ? highlightedLineWidth : notHighlightedLineWidth;
  }
  return { computedColor, lineWidth };
};

export default setLineStyles;
