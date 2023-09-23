import { PercentageChangeValue } from '@/__generated__/graphql';

const convertPercentageChangeValuesToPoints = (
  values: PercentageChangeValue[]
) => {
  const dataPoints = values.map((value) => ({
    time: value.time,
    value: value.percentageChange,
  }));

  return dataPoints;
};

export default convertPercentageChangeValuesToPoints;
