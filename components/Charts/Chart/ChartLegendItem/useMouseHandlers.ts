import { RefObject, useCallback, useContext, useEffect } from 'react';
import { HighlightContext } from '../../ChartHolder/HighlightContext';
import {
  highlightSymbol,
  toggleSymbolHighlightLock,
  unHighlightSymbol,
} from '../legendMakers/symbolHighlighters';

const useMouseHandlers = (
  symbol: string,
  legendItem: RefObject<HTMLHeadingElement>
) => {
  const { setHighlightedSymbols } = useContext(HighlightContext);

  const handleMouseEnter = useCallback(() => {
    highlightSymbol(symbol, setHighlightedSymbols);
  }, [symbol, setHighlightedSymbols]);
  const handleMouseLeave = useCallback(() => {
    unHighlightSymbol(symbol, setHighlightedSymbols);
  }, [symbol, setHighlightedSymbols]);
  const handleMouseClick = useCallback(() => {
    toggleSymbolHighlightLock(symbol, setHighlightedSymbols);
  }, [symbol, setHighlightedSymbols]);

  const mouseHandlers = [
    { handler: handleMouseEnter, event: 'mouseenter' },
    { handler: handleMouseLeave, event: 'mouseleave' },
    { handler: handleMouseClick, event: 'click' },
  ];

  useEffect(() => {
    const item = legendItem.current;
    if (item) {
      mouseHandlers.forEach((func) => {
        const { handler, event } = func;
        item.addEventListener(event, handler);
        return () => {
          item.removeEventListener(event, handler);
        };
      });
    }
  });
};

export default useMouseHandlers;
