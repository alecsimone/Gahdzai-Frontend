import SymbolElement from './SymbolElement';
import LatestValueElement from './LatestValueElement';
import getChangeElements from './getChangeElements';
import type { PercentageChangeSet } from '../../Charts/types';
import ChartLegendItem from './ChartLegendItem';

// * Creates the legend element for provided percentageChange chart data
type Signature = (
  percentageChangeSet: PercentageChangeSet,
  lineIndex: number
) => React.ReactNode;

const getLegendElementsFromPercentageData: Signature = (
  percentageChangeSet,
  lineIndex
) => {
  const symbolElement: React.ReactNode = (
    <SymbolElement symbol={percentageChangeSet.symbol} lineIndex={lineIndex} />
  );
  const latestValueElement: React.ReactNode = (
    <LatestValueElement latestValue={percentageChangeSet.latestValue} />
  );
  const [rawChangeElement, percentChangeElement] = getChangeElements({
    latestValue: percentageChangeSet.latestValue,
    initialValue: percentageChangeSet.initialValue,
  });

  const labelElements = [
    symbolElement,
    latestValueElement,
    rawChangeElement,
    percentChangeElement,
  ];

  return (
    <ChartLegendItem symbol={percentageChangeSet.symbol} isComparison>
      {labelElements}
    </ChartLegendItem>
  );
};

export default getLegendElementsFromPercentageData;
