import { useContext, useRef, RefObject } from 'react';
import { HighlightContext } from '../../ChartHolder/Contexts/HighlightContext';

import useMouseHandlers from './useMouseHandlers';

const useChartLegendItem = (
  symbol: string
): [RefObject<HTMLHeadingElement>, boolean] => {
  const legendItem = useRef<HTMLHeadingElement>(null);
  const { highlightedSymbols } = useContext(HighlightContext);

  const isHighlighted = highlightedSymbols.some(
    (item) => item.symbol === symbol
  );

  useMouseHandlers(symbol, legendItem);

  return [legendItem, isHighlighted];
};

export default useChartLegendItem;
