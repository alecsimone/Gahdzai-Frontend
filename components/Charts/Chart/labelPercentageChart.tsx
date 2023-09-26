import { Dispatch, SetStateAction, ReactNode } from 'react';
import { PercentageChanges } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import makeNumberReadable from '@/utils/makeNumberReadable';
import { white } from '@/styles/constants/colors';
import { setLightness } from '@/styles/functions/modifyColorFunctions';
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

    let changeColor = white;
    if (dailyPointChange > 0) {
      changeColor = upColor;
    } else if (dailyPointChange < 0) {
      changeColor = setLightness(downColor, 60);
    }

    const rawChangeString = `${makeNumberReadable(dailyPointChange)}`;
    const percentChangeString = `[${makeNumberReadable(lastPercentChange)}%]`;

    const rawChangeElement = (
      <span style={{ color: changeColor }}>{rawChangeString}</span>
    );
    const percentChangeElement = (
      <span style={{ color: changeColor, fontWeight: '600' }}>
        {percentChangeString}
      </span>
    );

    const labelElements = [
      symbolElement,
      latestValueElement,
      rawChangeElement,
      percentChangeElement,
    ];

    return <h6 className="chartLabel">{labelElements}</h6>;
  });
  setLegendElements(elements);
};

export default labelPercentageChart;
