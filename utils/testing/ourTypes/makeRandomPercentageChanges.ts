import {
  PercentageChangeValue,
  PercentageChanges,
} from '@/__generated__/graphql';
import makeRandomNumber from '../primitives/makeRandomNumber';
import makeRandomTimestamp from './makeRandomTimestamp';
import makeRandomString from '../primitives/makeRandomString';

export const makeRandomPercentageChangeValue = (): PercentageChangeValue => ({
  __typename: 'PercentageChangeValue',
  percentageChange: makeRandomNumber(6, true),
  time: `${makeRandomTimestamp()}`,
});

export const makeRandomPercentageChangeValuesArray = (
  length: number
): PercentageChangeValue[] => {
  const percentageChangeValuesArray = [];
  for (let i = 0; i < length; i += 1) {
    const percentageChange = makeRandomPercentageChangeValue();
    percentageChangeValuesArray.push(percentageChange);
  }
  return percentageChangeValuesArray;
};

const makeRandomPercentageChanges = (): PercentageChanges => ({
  __typename: 'PercentageChanges',
  latestValue: makeRandomNumber(6, true),
  previousClose: makeRandomNumber(6, true),
  symbol: makeRandomString(3),
  values: makeRandomPercentageChangeValuesArray(150),
});

export default makeRandomPercentageChanges;

export const makeRandomPercentageChangesArray = (
  length: number
): PercentageChanges[] => {
  const percentageChangesArray: PercentageChanges[] = [];
  for (let i = 0; i < length; i += 1) {
    const newPercentageChanges = makeRandomPercentageChanges();
    percentageChangesArray.push(newPercentageChanges);
  }

  return percentageChangesArray;
};
