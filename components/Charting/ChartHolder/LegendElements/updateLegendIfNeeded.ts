import type { Dispatch, SetStateAction } from 'react';
import isEqual from 'lodash/isEqual';

// * Checks if the legend needs to be updated and if so, updates it
type Signature = (
  elements: React.ReactNode[],
  setLegendElements: Dispatch<SetStateAction<React.ReactNode[]>>
) => void;

const updateLegendIfNeeded: Signature = (elements, setLegendElements) => {
  setLegendElements((prev) => {
    if (isEqual(prev, elements)) return prev;
    return elements;
  });
};

export default updateLegendIfNeeded;
