import type { DataPoint } from '../../types';

// * Takes in an array of datapoints and returns a new array of datapoints that represent the moving average of the original array
type Signature = (datapoints: DataPoint[]) => DataPoint[];

const getMovingAveragePeriod = (dataLength: number) => {
  if (dataLength < 20) {
    return 0;
  }
  if (dataLength < 40) {
    return 10;
  }
  if (dataLength < 200) {
    return 20;
  }
  if (dataLength < 400) {
    return 50;
  }
  if (dataLength < 1000) {
    return 100;
  }
  return 200;
};

const convertDataPointsToSMAPoints: Signature = (dataPoints) => {
  const movingAveragePeriod = getMovingAveragePeriod(dataPoints.length);

  if (movingAveragePeriod === 0) return [];

  // const timeAdjustment = (dataPoints[1]!.time - dataPoints[0]!.time) / 2;

  const smaPoints: DataPoint[] = [];
  dataPoints.forEach((dataPoint, index) => {
    if (index < movingAveragePeriod - 1) {
      // When we don't have enough data yet to do a full period moving average, we do a moving average of the datapoints so far
      let total = 0;
      for (let i = 0; i <= index; i += 1) {
        // Get the total of all values up to this one
        const thisValue = dataPoints[i]!.value;
        total += thisValue;
      }

      // And take their average
      const average = total / (index + 1);
      const smaPoint: DataPoint = {
        // time: dataPoint.time + timeAdjustment,
        time: dataPoint.time,
        value: average,
      };

      smaPoints.push(smaPoint);
    } else {
      let total = 0;
      for (let i = 0; i < movingAveragePeriod; i += 1) {
        const thisValue = dataPoints[index - i]!.value;
        total += thisValue;
      }

      const average = total / movingAveragePeriod;
      const smaPoint: DataPoint = {
        // time: dataPoint.time + timeAdjustment,
        time: dataPoint.time,
        value: average,
      };
      smaPoints.push(smaPoint);
    }
  });

  return smaPoints;
};

export default convertDataPointsToSMAPoints;
