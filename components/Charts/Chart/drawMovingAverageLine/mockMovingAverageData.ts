import { DataPoint } from '../types';

export const makeDataPointsArrayOfLength = (length: number) => {
  const dataPointsArray: DataPoint[] = [];

  for (let i = 1; i <= length; i += 1) {
    const dataPoint: DataPoint = {
      time: `${i * 100}`,
      value: i,
    };

    dataPointsArray.push(dataPoint);
  }

  return dataPointsArray;
};

export const mockChartData = {
  ctx: null as unknown as CanvasRenderingContext2D,
  usableWidth: 1150,
  usableHeight: 2250,
  chartBoundaries: {
    chartTop: 200,
    chartBottom: 100,
    chartStart: 0,
    chartEnd: 1000,
  },
};
