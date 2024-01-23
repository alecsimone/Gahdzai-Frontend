import type { Dispatch, SetStateAction } from 'react';
import isEqual from 'lodash/isEqual';

// * Checks if the legend needs to be updated and if so, updates it
type Signature = (
  elements: JSX.Element[],
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>
) => JSX.Element[];

const updateLegendIfNeeded: Signature = (elements, setLegendElements) => {
  setLegendElements((prev) => {
    if (isEqual(prev, elements)) return prev;
    return elements;
  });
  return elements;
};

export default updateLegendIfNeeded;
