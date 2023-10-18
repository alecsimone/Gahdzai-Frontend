import { useState } from 'react';
import {
  HighlightContextDataObjectInterface,
  HighlightedSymbols,
} from './HighlightContext';

// * Creates state to keep track of which symbols on the chart have been highlighted and creates an object with that state and its setter that can be sent back to ChartHolder to be put into Context
type Signature = () => HighlightContextDataObjectInterface;

const useHighlightContext: Signature = () => {
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
