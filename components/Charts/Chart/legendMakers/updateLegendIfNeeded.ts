import { Dispatch, SetStateAction } from 'react';

const updateLegendIfNeeded = (
  elements: JSX.Element[],
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>
) => {
  setLegendElements((prev) => {
    if (prev.length !== elements.length) {
      return elements;
    }
    let shouldUpdate: boolean = false;
    elements.forEach((el, index) => {
      const prevEl = prev[index];
      if (prevEl == null) {
        shouldUpdate = true;
      }
      if (prevEl.key !== el.key) {
        shouldUpdate = true;
      }
    });
    if (shouldUpdate) return elements;
    return prev;
  });
};

export default updateLegendIfNeeded;
