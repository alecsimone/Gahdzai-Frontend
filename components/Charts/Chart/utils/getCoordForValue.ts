// * Figures out the coordinate of a value based on the size of the chart and the range of the data it covers
type Signature = (
  value: number,
  chartSizeInPixels: number,
  origin: number,
  terminus: number
) => number;

const getCoordForValue: Signature = (
  value,
  chartSizeInPixels,
  origin,
  terminus
) => {
  const range = terminus - origin;
  const pixelsPerPoint = chartSizeInPixels / range;
  const pointsFromOrigin = value - origin;
  const pixelsFromOrigin = pointsFromOrigin * pixelsPerPoint;

  return Math.round(pixelsFromOrigin);
};

export default getCoordForValue;
