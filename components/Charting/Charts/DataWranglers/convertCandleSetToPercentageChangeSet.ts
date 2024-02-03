import type { CandleSet } from '@/__generated__/graphql';
import type { PercentageChange, PercentageChangeSet } from '../types';
import type { Period } from '../../ChartHolder/PeriodButtons/ChartPeriodContextTypes';

// * Takes in a CandleSet and spits out a PercentageChange set
type Signature = (candleSet: CandleSet, period: Period) => PercentageChangeSet;

const convertCandleSetToPercentageChangeSet: Signature = (
  candleSet,
  period
) => {
  const initialValue =
    period === 'D'
      ? Number(candleSet.candles[0]!.close)
      : Number(candleSet.candles[0]!.open);
  const latestValue = Number(candleSet.candles.at(-1)!.close);

  const percentageChangeSet: PercentageChangeSet = {
    symbol: candleSet.symbol,
    initialValue,
    latestValue,
    changes: [],
  };

  const candles = [...candleSet.candles!];
  if (period === 'D') {
    candles.shift();
  }

  const changes: PercentageChange[] = candles.map((candle) => {
    const change = Number(candle.close) - initialValue;
    const percentChange = (change / initialValue) * 100;
    const percentageChange: PercentageChange = {
      time: Number(candle.time),
      change: percentChange,
    };
    return percentageChange;
  });

  percentageChangeSet.changes = changes;

  return percentageChangeSet;
};

export default convertCandleSetToPercentageChangeSet;
