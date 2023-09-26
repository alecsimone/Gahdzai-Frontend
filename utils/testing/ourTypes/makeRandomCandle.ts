import { Candle } from '@/__generated__/graphql';
import makeRandomNumber from '../primitives/makeRandomNumber';
import makeRandomTimestamp from './makeRandomTimestamp';

const makeRandomCandle = (): Candle => ({
  __typename: 'Candle',
  close: `${makeRandomNumber(6, true)}`,
  high: `${makeRandomNumber(6, true)}`,
  low: `${makeRandomNumber(6, true)}`,
  open: `${makeRandomNumber(6, true)}`,
  time: `${makeRandomTimestamp()}`,
});

export default makeRandomCandle;

export const makeRandomCandlesArray = (length: number): Candle[] => {
  const candlesArray = [];
  for (let i = 0; i < length; i += 1) {
    const newCandle = makeRandomCandle();
    candlesArray.push(newCandle);
  }

  return candlesArray;
};
