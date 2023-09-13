import { DataPoint } from '../types';

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

const convertDataPointsToSMAPoints = (dataPoints: DataPoint[]) => {
  const movingAveragePeriod = getMovingAveragePeriod(dataPoints.length);

  if (movingAveragePeriod === 0) return [];

  const timeAdjustment =
    (parseInt(dataPoints[1].time, 10) - parseInt(dataPoints[0].time, 10)) / 2;

  const smaPoints: DataPoint[] = [];
  dataPoints.forEach((dataPoint, index) => {
    if (index < movingAveragePeriod - 1) {
      let total = 0;
      for (let i = 0; i <= index; i += 1) {
        const thisValue = dataPoints[i].value;
        total += thisValue;
      }

      const average = total / (index + 1);
      const smaPoint: DataPoint = {
        time: `${parseInt(dataPoint.time, 10) + timeAdjustment}`,
        value: average,
      };

      smaPoints.push(smaPoint);
    } else {
      // if (index >= movingAveragePeriod - 1) {
      let total = 0;
      for (let i = 0; i < movingAveragePeriod; i += 1) {
        const thisValue = dataPoints[index - i].value;
        total += thisValue;
      }

      const average = total / movingAveragePeriod;
      const smaPoint: DataPoint = {
        time: `${parseInt(dataPoint.time, 10) + timeAdjustment}`,
        value: average,
      };
      smaPoints.push(smaPoint);
    }
  });

  return smaPoints;
};

export default convertDataPointsToSMAPoints;
