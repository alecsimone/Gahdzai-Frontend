import { type Dispatch, type SetStateAction, createContext } from 'react';

export interface HighlightedSymbols {
  symbol: string;
  isLocked: boolean;
}

export interface HighlightContextDataObjectInterface {
  setHighlightedSymbols: Dispatch<SetStateAction<HighlightedSymbols[]>>;
  highlightedSymbols: HighlightedSymbols[];
}

const defaultHighlightContextData = {
  setHighlightedSymbols: () => {},
  highlightedSymbols: [],
};

export const HighlightContext =
  createContext<HighlightContextDataObjectInterface>(
    defaultHighlightContextData
  );
