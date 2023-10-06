import { useCallback, useContext, useEffect, useRef, RefObject } from 'react';
import { HighlightContext } from '../../ChartHolder/HighlightContext';
import {
  highlightSymbol,
  toggleSymbolHighlightLock,
  unHighlightSymbol,
} from '../legendMakers/symbolHighlighters';

const useChartLegendItem = (
  symbol: string
): [RefObject<HTMLHeadingElement>, boolean] => {
  const legendItem = useRef<HTMLHeadingElement>(null);
  const { setHighlightedSymbols, highlightedSymbols } =
    useContext(HighlightContext);

  const isHighlighted = highlightedSymbols.some(
    (item) => item.symbol === symbol
  );

  const handleMouseEnter = useCallback(() => {
    highlightSymbol(symbol, setHighlightedSymbols);
  }, [symbol, highlightSymbol]);
  const handleMouseLeave = useCallback(() => {
    unHighlightSymbol(symbol, setHighlightedSymbols);
  }, [symbol, unHighlightSymbol]);
  const handleMouseClick = useCallback(() => {
    toggleSymbolHighlightLock(symbol, setHighlightedSymbols);
  }, [symbol, toggleSymbolHighlightLock]);

  useEffect(() => {
    const item = legendItem.current;
    if (item) {
      item.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
    return () => null;
  }, [handleMouseEnter]);

  useEffect(() => {
    const item = legendItem.current;
    if (item) {
      item.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    return () => null;
  }, [handleMouseLeave]);

  useEffect(() => {
    const item = legendItem.current;
    if (item) {
      item.addEventListener('click', handleMouseClick);
      return () => {
        item.removeEventListener('click', handleMouseClick);
      };
    }
    return () => null;
  }, [handleMouseClick]);

  return [legendItem, isHighlighted];
};

export default useChartLegendItem;
