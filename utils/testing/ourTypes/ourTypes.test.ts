import {
  Candle,
  PercentageChangeValue,
  PercentageChanges,
} from '@/__generated__/graphql';
import { makeRandomCandlesArray } from './makeRandomCandle';
import makeRandomTimestamp from './makeRandomTimestamp';
import {
  makeRandomPercentageChangeValuesArray,
  makeRandomPercentageChangesArray,
} from './makeRandomPercentageChanges';
// import '@testing-library/jest-dom';

describe('makeRandomTimestamp', () => {
  it('Makes a valid timestamp', () => {
    const timestamp = makeRandomTimestamp();
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();

    expect(year).toBeGreaterThanOrEqual(2018);

    const msTimestamp = makeRandomTimestamp(true);
    const msDate = new Date(msTimestamp);
    const msYear = msDate.getFullYear();

    expect(msYear).toBeGreaterThanOrEqual(2018);
  });
});

describe('makeRandomCandlesArray', () => {
  it('Makes the right number of candles', () => {
    const length = 100;
    const candlesArray: Candle[] = makeRandomCandlesArray(length);
    expect(candlesArray).toHaveLength(length);
  });
});

describe('makeRandomPercentageChangeValuesArray', () => {
  it('Makes the right number of percentageChangeValues', () => {
    const length = 5;
    const percentageChangeValues: PercentageChangeValue[] =
      makeRandomPercentageChangeValuesArray(length);
    expect(percentageChangeValues).toHaveLength(length);
  });
});

describe('makeRandomPercentageChanges', () => {
  it('Makes the right number of percentageChanges', () => {
    const length = 5;
    const percentageChanges: PercentageChanges[] =
      makeRandomPercentageChangesArray(length);
    expect(percentageChanges).toHaveLength(length);
  });
});
