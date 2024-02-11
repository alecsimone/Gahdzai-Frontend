// * Given a Y coordinate, the usable height of the chart, and the range of values in the chart, return the value at that coordinate within that chart
type Signature = (dataObj: {
  y: number;
  chartTop: number;
  chartBottom: number;
  usableHeight: number;
}) => number;

const getYValueByCoord: Signature = ({
  chartTop,
  chartBottom,
  usableHeight,
  y,
}) => {
  const range = chartTop - chartBottom;
  const pointsPerPixel = range / usableHeight;

  const thisCoordOffsetInPoints = y * pointsPerPixel;

  const value = chartTop - thisCoordOffsetInPoints;

  return value;
};

export default getYValueByCoord;
