import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';
import { resolution } from '../Chart/constants';
import getQueryTimeBoundaries from './getQueryTimeBoundaries';

export interface HighlightedSymbols {
  symbol: string;
  isLocked: boolean;
}

interface HighlightContextDataObjectInterface {
  highlightSymbol: (symbol: string) => void;
  unHighlightSymbol: (symbol: string) => void;
  toggleSymbolHighlightLock: (symbol: string) => void;
  highlightedSymbols: HighlightedSymbols[];
}

const defaultHighlightContextData = {
  highlightSymbol: (symbol: string) => {
    console.log(symbol);
  },
  unHighlightSymbol: (symbol: string) => {
    console.log(symbol);
  },
  toggleSymbolHighlightLock: (symbol: string) => {
    console.log(symbol);
  },
  highlightedSymbols: [],
};

export const HighlightContext =
  React.createContext<HighlightContextDataObjectInterface>(
    defaultHighlightContextData
  );

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<JSX.Element[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);
  const [highlightedSymbols, setHighlightedSymbols] = useState<
    HighlightedSymbols[]
  >([]);

  const highlightSymbol = (symbol: string) => {
    setHighlightedSymbols((prev) => {
      const symbolIndex = prev.findIndex((obj) => obj.symbol === symbol);
      if (symbolIndex === -1) {
        return [...prev, { symbol, isLocked: false }];
      }
      return prev;
    });
  };
  const unHighlightSymbol = (symbol: string) => {
    setHighlightedSymbols((prev) => {
      const newHighlightedSymbols = prev.filter((obj) => {
        if (obj.symbol !== symbol) return true;
        if (obj.isLocked) return true;
        return false;
      });
      return newHighlightedSymbols;
    });
  };
  const toggleSymbolHighlightLock = (symbol: string) => {
    setHighlightedSymbols((prev) => {
      const symbolExistedPreviously = prev.some(
        (item) => item.symbol === symbol
      );
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

  const highlightContextData: HighlightContextDataObjectInterface = {
    highlightSymbol,
    unHighlightSymbol,
    toggleSymbolHighlightLock,
    highlightedSymbols,
  };

  const [previousClose, nextClose] = getQueryTimeBoundaries();

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
  return {
    data,
    loading,
    error,
    legendElements,
    setLegendElements,
    HighlightContext,
    highlightContextData,
  };
};

export default useChartHolder;
