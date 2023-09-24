import { Dispatch, SetStateAction, ReactNode } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import makeNumberReadable from '@/utils/makeNumberReadable';
import { white } from '@/styles/constants/colors';
import getLineColor from './utils/getLineColor';
import { downColor, upColor } from './constants';

const labelPercentageChart = (
  setLegendElements: Dispatch<SetStateAction<ReactNode[]>>,
  data: PercentageChanges[]
) => {
  const elements = data.map((changes, index) => {
    const color = getLineColor(changes.symbol, index);

    const lastPercentChange =
      changes.values[changes.values.length - 1].percentageChange;

    const { latestValue, previousClose } = changes;

    const dailyPointChange =
      makeSafeDecimals(latestValue) - makeSafeDecimals(previousClose);

    const symbolElement = (
      <span className="symbol" style={{ color, fontWeight: 'bold' }}>
        {changes.symbol}
      </span>
    );

    const latestValueString = `${makeNumberReadable(latestValue)}`;
    const latestValueElement = <span>{latestValueString}</span>;

    const changeString = `(${makeNumberReadable(
      dailyPointChange
    )}, ${makeNumberReadable(lastPercentChange)}%)`;
    let changeColor = white;
    if (dailyPointChange > 0) {
      changeColor = upColor;
    } else if (dailyPointChange < 0) {
      changeColor = downColor;
    }
    const changeElement = (
      <span style={{ color: changeColor }}>{changeString}</span>
    );

    const labelElements = [symbolElement, latestValueElement, changeElement];

    return <h6 className="chartLabel">{labelElements}</h6>;
  });
  setLegendElements(elements);
};

export default labelPercentageChart;
