import type { CandleSet } from '../../Charts/types';
import ChartLegendItem from './ChartLegendItem';
import LatestValueElement from './LatestValueElement';
import SymbolElement from './SymbolElement';
import getChangeElements from './getChangeElements';

// * Describe the purpose of this function in clearer language than the function name can convey.
type Signature = (data: CandleSet) => React.ReactNode;

const getLegendElementFromCandlestickData: Signature = (
  data
): React.ReactNode => {
  const symbolElement: React.ReactNode = (
    <SymbolElement symbol={data.symbol} lineIndex={0} />
  );

  const latestValue = data.candles.at(-1)!.close;

  const latestValueElement: React.ReactNode = (
    <LatestValueElement latestValue={latestValue} />
  );

  const { initialValue } = data;
  const [rawChangeElement, percentChangeElement] = getChangeElements({
    latestValue,
    initialValue,
  });

  const labelElements = [
    symbolElement,
    latestValueElement,
    rawChangeElement,
    percentChangeElement,
  ];

  return (
    <ChartLegendItem symbol={data.symbol} isComparison={false}>
      {labelElements}
    </ChartLegendItem>
  );
};

export default getLegendElementFromCandlestickData;
