import {
  PercentageChangeValue,
  PercentageChanges,
} from '@/__generated__/graphql';

const smashPercentageChangesIntoTimes = (data: PercentageChanges[]) => {
  let allValues: PercentageChangeValue[] = [];
  data.forEach((symbolData) => {
    const newValues = allValues.concat(symbolData.values);
    allValues = newValues;
  });

  const allTimes = allValues.map((value) => value.time);
  return allTimes;
};

export default smashPercentageChangesIntoTimes;
