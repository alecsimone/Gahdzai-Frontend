import { CandleSet } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import { Period } from './ChartPeriodContext';
import { PercentageChangeValue, PercentageChanges } from '../Chart/types';

const getPercentageChangesFromCandles = (
  data: CandleSet[],
  activePeriod: Period
): PercentageChanges[] => {
  const percentageChanges: PercentageChanges[] = data.map((candleSet) => {
    // We need: latestValue, previousClose, symbol, and values. Values is percentageChange and time
    const { candles, symbol } = candleSet;
    let initialValue: number;
    if (activePeriod === 'D') {
      initialValue = makeSafeDecimals(candles[0].close);
    } else {
      initialValue = makeSafeDecimals(candles[0].open);
    }
    const values: PercentageChangeValue[] = candles.map((candle) => {
      const { close, time } = candle;
      const closeNumber = makeSafeDecimals(close);
      const percentageChange = makeSafeDecimals(
        (100 * (closeNumber - initialValue)) / initialValue
      );
      return {
        percentageChange,
        time,
      };
    });

    if (activePeriod === 'D') {
      values.shift();
    }

    let latestValue: number;
    const lastClose = candles.at(-1)?.close;
    if (lastClose == null) {
      latestValue = 0;
    } else {
      latestValue = makeSafeDecimals(lastClose);
    }

    return {
      symbol,
      initialValue,
      latestValue,
      values,
    };
  });

  return percentageChanges;
};

export default getPercentageChangesFromCandles;
