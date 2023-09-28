import { Dispatch, SetStateAction } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';

import getLegendElementsFromPercentageData from './legendMakers/getLegendElementsFromPercentageData';

const labelPercentageChart = (
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>,
  data: PercentageChanges[]
) => {
  const elements = data.map(getLegendElementsFromPercentageData);
  setLegendElements((prev) => {
    elements.forEach((el, index) => {
      const prevEl = prev[index];
      if (prevEl == null) return elements;
      if (prevEl.key !== el.key) return elements;
      return prev;
    });
    if (prev.length !== elements.length) {
      return elements;
    }
    return prev;
  });
};

export default labelPercentageChart;
