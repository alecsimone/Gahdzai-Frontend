import { Dispatch, SetStateAction } from 'react';
import { HighlightedSymbols } from '../../ChartHolder/Contexts/HighlightContext';

export const highlightSymbol = (
  symbol: string,
  setHighlightedSymbols: Dispatch<SetStateAction<HighlightedSymbols[]>>
) => {
  setHighlightedSymbols((prev) => {
    const symbolIndex = prev.findIndex((obj) => obj.symbol === symbol);
    if (symbolIndex === -1) {
      return [...prev, { symbol, isLocked: false }];
    }
    return prev;
  });
};

export const unHighlightSymbol = (
  symbol: string,
  setHighlightedSymbols: Dispatch<SetStateAction<HighlightedSymbols[]>>
) => {
  setHighlightedSymbols((prev) => {
    const newHighlightedSymbols = prev.filter((obj) => {
      if (obj.symbol !== symbol) return true;
      if (obj.isLocked) return true;
      return false;
    });
    return newHighlightedSymbols;
  });
};

export const toggleSymbolHighlightLock = (
  symbol: string,
  setHighlightedSymbols: Dispatch<SetStateAction<HighlightedSymbols[]>>
) => {
  setHighlightedSymbols((prev) => {
    const symbolExistedPreviously = prev.some((item) => item.symbol === symbol);
    if (symbolExistedPreviously) {
      const newHighlightedSymbols = prev.map((item) => {
        if (item.symbol === symbol) {
          if (item.isLocked) return { symbol: '', isLocked: false }; // If the item is already locked we want to just remove it, not set it to false, so that it un-highlights instantly
          return { ...item, isLocked: true };
        }
        return item;
      });
      const filteredHighlightedSymbols = newHighlightedSymbols.filter(
        (item) => item.symbol !== ''
      );
      return filteredHighlightedSymbols;
    }
    const newHighlightedSymbols = prev.concat([{ symbol, isLocked: true }]);
    return newHighlightedSymbols;
  });
};
