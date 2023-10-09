import makeNumberReadable from '@/utils/makeNumberReadable';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import getChangeColor from './getChangeColor';
import { PercentageChanges } from '../types';

const getChangeElements = ({
  latestValue,
  initialValue,
  values,
}: PercentageChanges): [JSX.Element, JSX.Element] => {
  const dailyPointChange =
    makeSafeDecimals(latestValue) - makeSafeDecimals(initialValue);
  const changeColor = getChangeColor(dailyPointChange);

  const rawChangeString = `${
    dailyPointChange > 0 ? '+' : ''
  }${makeNumberReadable({ number: dailyPointChange })}`;
  const rawChangeElement = (
    <span style={{ color: changeColor }} key="rawChange">
      {rawChangeString}
    </span>
  );

  const lastPercentChange = values[values.length - 1].percentageChange;
  const percentChangeString = `[${
    dailyPointChange > 0 ? '+' : ''
  }${makeNumberReadable({ number: lastPercentChange })}%]`;
  const percentChangeElement = (
    <span style={{ color: changeColor, fontWeight: '600' }} key="percentChange">
      {percentChangeString}
    </span>
  );

  return [rawChangeElement, percentChangeElement];
};

export default getChangeElements;
