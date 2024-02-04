import makeNumberReadable from '@/utils/makeNumberReadable';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import getChangeColor from './getChangeColor';

// * Creates two styled text elements containing the raw change and percentage change from the initial value for a PercentageChangeSet
type Signature = (dataObj: {
  latestValue: number;
  initialValue: number;
}) => [React.ReactNode, React.ReactNode];

const getChangeElements: Signature = ({
  latestValue,
  initialValue,
}): [React.ReactNode, React.ReactNode] => {
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

  const finalPercentChange =
    (100 * (latestValue - initialValue)) / initialValue;
  const percentChangeString = `[${
    dailyPointChange > 0 ? '+' : ''
  }${makeNumberReadable({ number: finalPercentChange })}%]`;
  const percentChangeElement = (
    <span style={{ color: changeColor, fontWeight: '600' }} key="percentChange">
      {percentChangeString}
    </span>
  );

  return [rawChangeElement, percentChangeElement];
};

export default getChangeElements;
