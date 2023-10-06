import { useState } from 'react';
import {
  HighlightContextDataObjectInterface,
  HighlightedSymbols,
} from './HighlightContext';

const useHighlightContext = () => {
  const [highlightedSymbols, setHighlightedSymbols] = useState<
    HighlightedSymbols[]
  >([]);
  const highlightContextData: HighlightContextDataObjectInterface = {
    setHighlightedSymbols,
    highlightedSymbols,
  };

  return highlightContextData;
};

export default useHighlightContext;
