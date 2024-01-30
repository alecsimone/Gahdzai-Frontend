// * Figures out the X coordinate of a point based on its index, the size of the chart, and the total number of points
type Signature = (
  chartSizeInPixels: number,
  index: number,
  totalPoints: number
) => number;

const getXCoordByIndex: Signature = (chartSizeInPixels, index, totalPoints) => {
  const pixelsPerPoint = chartSizeInPixels / totalPoints;
  const pixelsForIndex = Math.round(index * pixelsPerPoint);
  return pixelsForIndex;
};

export default getXCoordByIndex;
