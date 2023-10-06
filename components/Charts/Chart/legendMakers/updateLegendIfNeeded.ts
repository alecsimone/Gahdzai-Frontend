import { Dispatch, SetStateAction } from 'react';
import isEqual from 'lodash/isEqual';

const updateLegendIfNeeded = (
  elements: JSX.Element[],
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>
) => {
  setLegendElements((prev) => {
    if (isEqual(prev, elements)) return prev;
    return elements;
    // if (prev.length !== elements.length) {
    //   return elements;
    // }
    // let shouldUpdate: boolean = false;
    // elements.forEach((el, index) => {
    //   const prevEl = prev[index];
    //   console.log({ prevEl: prevEl.props.children, el: el.props.children });
    //   if (prevEl == null) {
    //     shouldUpdate = true;
    //   }
    //   if (prevEl.key !== el.key) {
    //     shouldUpdate = true;
    //   }
    // });
    // if (shouldUpdate) return elements;
    // return prev;
  });
};

export default updateLegendIfNeeded;
