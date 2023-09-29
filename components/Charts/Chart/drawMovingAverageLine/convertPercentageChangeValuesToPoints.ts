import { PercentageChangeValue } from '@/__generated__/graphql';

const convertPercentageChangeValuesToPoints = (
  values: PercentageChangeValue[],
  usableWidth: number
) => {
  const reductionFactor = Math.ceil(values.length / usableWidth);
  const dataPoints = values.map((value) => ({
    time: value.time,
    value: value.percentageChange,
  }));

  if (reductionFactor === 1) return dataPoints;

  const filteredData = dataPoints.filter((point, index) => {
    if (index % reductionFactor === 0) {
      return true;
    }
    return false;
  });

  return filteredData;
};

export default convertPercentageChangeValuesToPoints;
