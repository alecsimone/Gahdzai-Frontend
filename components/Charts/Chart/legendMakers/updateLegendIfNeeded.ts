import { Dispatch, SetStateAction } from 'react';

const updateLegendIfNeeded = (
  elements: JSX.Element[],
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>
) => {
  setLegendElements((prev) => {
    if (prev.length !== elements.length) {
      return elements;
    }
    elements.forEach((el, index) => {
      const prevEl = prev[index];
      if (prevEl == null) return elements;
      if (prevEl.key !== el.key) return elements;
      return prev;
    });
    return prev;
  });
};

export default updateLegendIfNeeded;
