import { Candle } from '@/__generated__/graphql';

const getDataStart = (candles: Candle[]) => candles[0].time;

export default getDataStart;
