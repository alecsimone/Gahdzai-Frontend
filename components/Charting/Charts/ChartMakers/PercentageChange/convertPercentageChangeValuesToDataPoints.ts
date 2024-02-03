import type { DataPoint, PercentageChange } from '../../types';

// * Converts an array of PercentageChangeValues into our standardized DataPoint type, while also making sure we only have as many of them as will fit pleasantly in our chart
type Signature = (
  changes: PercentageChange[],
  usableWidth: number
) => DataPoint[];

const convertPercentageChangeValuesToDataPoints: Signature = (
  changes,
  usableWidth
) => {
  const reductionFactor = Math.ceil(changes.length / usableWidth);
  const dataPoints = changes.map((changeObj) => ({
    time: changeObj.time,
    value: changeObj.change,
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

export default convertPercentageChangeValuesToDataPoints;
