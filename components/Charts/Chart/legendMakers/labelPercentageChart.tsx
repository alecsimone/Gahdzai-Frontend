import { Dispatch, SetStateAction } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';

import getLegendElementsFromPercentageData from './getLegendElementsFromPercentageData';
import updateLegendIfNeeded from './updateLegendIfNeeded';

const labelPercentageChart = (
  setLegendElements: Dispatch<SetStateAction<JSX.Element[]>>,
  data: PercentageChanges[],
  highlightedSymbols: string[],
  setHighlightedSymbols: Dispatch<SetStateAction<string[]>>
) => {
  const elements = data.map((changes, index) =>
    getLegendElementsFromPercentageData(
      changes,
      index,
      highlightedSymbols,
      setHighlightedSymbols
    )
  );

  // ? If we're running out of data, we can test the legend with multiple elements by querying for one element and then using this code
  // if (elements.length === 1) {
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  //   elements.push(elements[0]);
  // }

  updateLegendIfNeeded(elements, setLegendElements);
};

export default labelPercentageChart;
