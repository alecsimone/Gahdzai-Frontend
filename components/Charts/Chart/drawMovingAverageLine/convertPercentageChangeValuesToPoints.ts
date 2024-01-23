import { type PercentageChangeValue } from '@/__generated__/graphql';
import { type DataPoint } from '../types';

// * Converts an array of PercentageChangeValues into our standardized DataPoint type, while also making sure we only have as many of them as will fit pleasantly in our chart
type Signature = (
  values: PercentageChangeValue[],
  usableWidth: number
) => DataPoint[];

const convertPercentageChangeValuesToPoints: Signature = (
  values,
  usableWidth
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
