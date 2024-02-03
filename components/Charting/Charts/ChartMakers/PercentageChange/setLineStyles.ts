import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { defaultLineAlpha, defaultLineWidth } from '../../constants';
import getLineColor from './getLineColor';

// * Sets up the styling for this percentageChangeLine
type Signature = (dataObj: { symbol: string; changeSetIndex: number }) => {
  computedColor: string;
  lineWidth: number;
};

const setLineStyles: Signature = ({ symbol, changeSetIndex }) => {
  const color = getLineColor({ symbol, lineIndex: changeSetIndex });
  let computedColor = setAlpha(color, defaultLineAlpha);
  let lineWidth = defaultLineWidth;

  return { computedColor, lineWidth };

  // TODO Below code is waiting on implementing highlighted symbols

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
};

export default setLineStyles;
