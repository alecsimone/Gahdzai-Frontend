const getCoordForValue = (
  value: number,
  chartSizeInPixels: number,
  origin: number,
  terminus: number
) => {
  const range = terminus - origin;
  const pixelsPerPoint = chartSizeInPixels / range;
  const pointsFromOrigin = value - origin;
  const pixelsFromOrigin = pointsFromOrigin * pixelsPerPoint;

  return Math.round(pixelsFromOrigin);
};

export default getCoordForValue;
