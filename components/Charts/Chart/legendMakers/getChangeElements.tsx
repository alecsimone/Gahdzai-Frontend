import { PercentageChanges } from '@/__generated__/graphql';
import makeNumberReadable from '@/utils/makeNumberReadable';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import getChangeColor from './getChangeColor';

const getChangeElements = ({
  latestValue,
  previousClose,
  values,
}: PercentageChanges): [JSX.Element, JSX.Element] => {
  const dailyPointChange =
    makeSafeDecimals(latestValue) - makeSafeDecimals(previousClose);
  const changeColor = getChangeColor(dailyPointChange);

  const rawChangeString = `${
    dailyPointChange > 0 ? '+' : ''
  }${makeNumberReadable(dailyPointChange)}`;
  const rawChangeElement = (
    <span style={{ color: changeColor }} key="rawChange">
      {rawChangeString}
    </span>
  );

  const lastPercentChange = values[values.length - 1].percentageChange;
  const percentChangeString = `[${
    dailyPointChange > 0 ? '+' : ''
  }${makeNumberReadable(lastPercentChange)}%]`;
  const percentChangeElement = (
    <span style={{ color: changeColor, fontWeight: '600' }} key="percentChange">
      {percentChangeString}
    </span>
  );

  return [rawChangeElement, percentChangeElement];
};

export default getChangeElements;
