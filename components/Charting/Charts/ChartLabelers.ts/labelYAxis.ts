import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import getYCoordByValue from '../DataPlotters/getYCoordByValue';
import { gutterPadding } from '../constants';
import resetStyling from '../ChartStylers.ts/resetStyling';

// * Draws the labels on the Y axis of our chart
type Signature = (dataObj: {
  yAxisLabels: string[];
  chartBottom: number;
  chartTop: number;
  usableHeight: MutableRefObject<number>;
  usableWidth: MutableRefObject<number>;
  ctx: CanvasRenderingContext2D;
  decorator: string;
}) => void;

const labelYAxis: Signature = ({
  yAxisLabels,
  chartBottom,
  chartTop,
  usableHeight,
  usableWidth,
  ctx,
  decorator,
}) => {
  const yAxisLabelObjectsArray = yAxisLabels.map((labelText) => {
    const value = Number(labelText);
    const yCoord = getYCoordByValue({
      chartBottom,
      chartTop,
      usableHeight: usableHeight.current,
      value,
    });
    return { labelText, yCoord };
  });

  resetStyling(ctx);
  ctx.textAlign = 'left';
  ctx.strokeStyle = setAlpha(coolGrey, 0.75);
  ctx.beginPath();
  yAxisLabelObjectsArray.forEach((labelObject, index) => {
    if (index === 0) {
      ctx.textBaseline = 'top';
    } else if (index === yAxisLabelObjectsArray.length - 1) {
      ctx.textBaseline = 'bottom';
    } else {
      ctx.textBaseline = 'middle';
      ctx.moveTo(0, labelObject.yCoord);
      ctx.lineTo(usableWidth.current, labelObject.yCoord);
    }

    ctx.fillText(
      `${labelObject.labelText}${decorator}`,
      usableWidth.current + gutterPadding,
      labelObject.yCoord
    );
  });
  ctx.stroke();
};

export default labelYAxis;
