import {
  PercentageChangeValue,
  PercentageChanges,
} from '@/__generated__/graphql';

const smashPercentageChangesIntoValues = (data: PercentageChanges[]) => {
  let allValues: PercentageChangeValue[] = [];
  data.forEach((symbolData) => {
    const newValues = allValues.concat(symbolData.values);
    allValues = newValues;
  });

  const allChanges = allValues.map((value) => value.percentageChange);
  return allChanges;
};

export default smashPercentageChangesIntoValues;
