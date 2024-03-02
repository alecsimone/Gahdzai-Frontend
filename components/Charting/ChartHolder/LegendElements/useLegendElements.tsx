import { useState, type Dispatch, type SetStateAction } from 'react';
import type {
  HighlightContextDataObjectInterface,
  HighlightedSymbols,
} from './HighlightContextTypes';

// * A hook to handle all the functionality of our Legend Elements. This includes:
// - Creating the state that holds the elements
// - Creating the context that holds the state of which symbol's element is currently highlighted
type Signature = (loadingElements: JSX.Element[]) => {
  legendElements: React.ReactNode;
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>;
  highlightContextData: HighlightContextDataObjectInterface;
};

const useLegendElements: Signature = (loadingElements) => {
  const [legendElements, setLegendElements] =
    useState<React.ReactNode[]>(loadingElements);

  const [highlightedSymbols, setHighlightedSymbols] = useState<
    HighlightedSymbols[]
  >([]);
  const highlightContextData: HighlightContextDataObjectInterface = {
    setHighlightedSymbols,
    highlightedSymbols,
  };

  return {
    legendElements,
    setLegendElements,
    highlightContextData,
  };
};

export default useLegendElements;
