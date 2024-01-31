import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import getYCoordByValue from '../DataPlotters/getYCoordByValue';
import { gutterPadding } from '../constants';
import resetStyling from '../ChartStylers.ts/resetStyling';
import getTextHeight from '../ChartStylers.ts/getTextHeight';

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

  const textHeight = getTextHeight(ctx);

  resetStyling(ctx);
  ctx.textAlign = 'left';
  ctx.strokeStyle = setAlpha(coolGrey, 0.75);
  ctx.beginPath();
  yAxisLabelObjectsArray.forEach((labelObject, index) => {
    let { yCoord } = labelObject;

    let skip = false;
    if (index === 1 && yCoord < 1.5 * textHeight) {
      skip = true;
    } else if (
      index === yAxisLabelObjectsArray.length - 2 &&
      yCoord > usableHeight.current - 1.5 * textHeight
    ) {
      skip = true;
    }

    if (index === 0) {
      ctx.textBaseline = 'top';

      yCoord = gutterPadding / 2;
    } else if (index === yAxisLabelObjectsArray.length - 1) {
      ctx.textBaseline = 'bottom';
      yCoord = usableHeight;
    } else {
      ctx.textBaseline = 'middle';
      ctx.moveTo(0, labelObject.yCoord);
      ctx.lineTo(usableWidth.current, labelObject.yCoord);
    }

    if (!skip) {
      ctx.fillText(
        `${labelObject.labelText}${decorator}`,
        usableWidth.current + gutterPadding,
        yCoord
      );
    }
  });
  ctx.stroke();
};

export default labelYAxis;
