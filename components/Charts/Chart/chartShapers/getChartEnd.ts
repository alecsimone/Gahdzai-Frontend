import { Candle } from '@/__generated__/graphql';

const getChartEnd = (candles: Candle[]) => candles[candles.length - 1].time;

export default getChartEnd;
