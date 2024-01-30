// * Given a value, the range of the values in a chart, and the usable size of the chart, return the Y coordinate for that value within that chart
type Signature = (dataObj: {
  value: number;
  chartTop: number;
  chartBottom: number;
  usableHeight: number;
}) => number;

const getYCoordByValue: Signature = ({
  value,
  chartTop,
  chartBottom,
  usableHeight,
}) => {
  const range = chartTop - chartBottom;
  const pixelsPerPoint = usableHeight / range;

  const thisValueOffsetInPoints = chartTop - value; // Remember that the top is Y = 0 on our canvas, so we're working from the top of the range, not the bottom
  const thisValueOffsetInPixels = thisValueOffsetInPoints * pixelsPerPoint;

  return thisValueOffsetInPixels;
};

export default getYCoordByValue;
