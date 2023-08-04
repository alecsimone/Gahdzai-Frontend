import { Candle } from '@/__generated__/graphql';

const getChartStart = (candles: Candle[]) => candles[0].time;

export default getChartStart;
