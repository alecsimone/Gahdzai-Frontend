import { type CandleSet } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import { type Period } from '../../ChartHolder/Contexts/ChartPeriodContext';
import { type PercentageChangeValue, type PercentageChanges } from '../types';

// * Converts an array of candles into an array of PercentageChanges. The big gotcha is with Daily periods, where we want to base our percentageChange off of the final candle from the previous day, but we don't want it in our final dataset. Otherwise this is as simple as just mapping over the candles to convert them into a percentage change from the first value

type Signature = (
  data: CandleSet[],
  activePeriod: Period
) => PercentageChanges[];

const getPercentageChangesFromCandles: Signature = (data, activePeriod) => {
  const percentageChanges: PercentageChanges[] = data.map((candleSet) => {
    const { candles, symbol } = candleSet;

    let initialValue: number;
    if (activePeriod === 'D' && candles[0] != null) {
      // For Daily periods we want the close of the last candle of the previous day, which will be our first candle. Otherwise, we can just use the open of the period
      initialValue = makeSafeDecimals(candles[0].close);
    } else if (candles[0] != null) {
      initialValue = makeSafeDecimals(candles[0].open);
    } else {
      initialValue = 0;
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
      // For Daily periods we're getting one candle from the end of the previous day to base our change on, but we don't want it to be part of our final dataset
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
