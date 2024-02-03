import { useRef, RefObject } from 'react';

const useChartLegendItem = (
  symbol: string
): [RefObject<HTMLHeadingElement>, boolean] => {
  const legendItem = useRef<HTMLHeadingElement>(null);

  // TODO Highlighted Symbols
  const isHighlighted = false;
  // const { highlightedSymbols } = useContext(HighlightContext);

  // const isHighlighted = highlightedSymbols.some(
  //   (item) => item.symbol === symbol
  // );

  // useMouseHandlers(symbol, legendItem);

  return [legendItem, isHighlighted];
};

export default useChartLegendItem;
