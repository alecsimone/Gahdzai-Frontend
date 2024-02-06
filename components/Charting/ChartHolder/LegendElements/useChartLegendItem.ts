import { useRef, type RefObject, useContext } from 'react';
import { HighlightContext } from './HighlightContextTypes';
import useMouseHandlers from './useMouseHandlers';

const useChartLegendItem = (
  symbol: string,
  isComparison: boolean
): [RefObject<HTMLHeadingElement>, boolean] => {
  const legendItem = useRef<HTMLHeadingElement>(null);

  // TODO Highlighted Symbols
  const { highlightedSymbols } = useContext(HighlightContext);

  const isHighlighted = highlightedSymbols.some(
    (item) => item.symbol === symbol
  );

  useMouseHandlers(symbol, legendItem, isComparison);

  return [legendItem, isHighlighted];
};

export default useChartLegendItem;
