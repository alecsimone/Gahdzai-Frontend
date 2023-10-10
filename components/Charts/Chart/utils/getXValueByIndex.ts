const getXValueByIndex = (
  chartSizeInPixels: number,
  index: number,
  totalPoints: number
) => {
  const pixelsPerPoint = chartSizeInPixels / totalPoints;
  const pixelsForIndex = Math.round(index * pixelsPerPoint);
  return pixelsForIndex;
};

export default getXValueByIndex;
