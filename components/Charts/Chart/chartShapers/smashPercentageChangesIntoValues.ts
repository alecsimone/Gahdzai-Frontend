import { PercentageChangeValue, PercentageChanges } from '../types';

// * Runs through our collection of PercentageChanges (which are all the PercentageChangeValues for a symbol along with some other data like the initial and latest value) and creates a new array that is just the raw change values. We'll use this to get the boundaries of the data.
type Signature = (data: PercentageChanges[]) => number[];

const smashPercentageChangesIntoValues: Signature = (data) => {
  let allValues: PercentageChangeValue[] = [];
  data.forEach((symbolData) => {
    const newValues = allValues.concat(symbolData.values);
    allValues = newValues;
  });

  const allChanges = allValues.map((value) => value.percentageChange);
  return allChanges;
};

export default smashPercentageChangesIntoValues;
