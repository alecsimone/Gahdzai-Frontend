import { PercentageChanges } from '@/__generated__/graphql';
import SymbolElement from './SymbolElement';
import LatestValueElement from './LatestValueElement';
import getChangeElements from './getChangeElements';

const getLegendElementsFromPercentageData = (
  changes: PercentageChanges,
  index: number
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
    <h6 className="chartLabel" key={changes.symbol}>
      {labelElements}
    </h6>
  );
};

export default getLegendElementsFromPercentageData;
