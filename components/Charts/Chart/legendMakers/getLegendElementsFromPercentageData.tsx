import { Dispatch, SetStateAction } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';
import SymbolElement from './SymbolElement';
import LatestValueElement from './LatestValueElement';
import getChangeElements from './getChangeElements';
import ChartLegendItem from '../ChartLegendItem/ChartLegendItem';

const getLegendElementsFromPercentageData = (
  changes: PercentageChanges,
  index: number,
  highlightedSymbols: string[],
  setHighlightedSymbols: Dispatch<SetStateAction<string[]>>
): JSX.Element => {
  const symbolElement = <SymbolElement symbol={changes.symbol} index={index} />;
  const latestValueElement = (
    <LatestValueElement latestValue={changes.latestValue} />
  );
  const [rawChangeElement, percentChangeElement] = getChangeElements(changes);

  const labelElements = [
    symbolElement,
    latestValueElement,
    rawChangeElement,
    percentChangeElement,
  ];

  return (
    <ChartLegendItem
      symbol={changes.symbol}
      highlightedSymbols={highlightedSymbols}
      setHighlightedSymbols={setHighlightedSymbols}
    >
      {labelElements}
    </ChartLegendItem>
  );
};

export default getLegendElementsFromPercentageData;
