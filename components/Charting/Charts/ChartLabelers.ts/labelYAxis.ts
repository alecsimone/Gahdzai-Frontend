import type { MutableRefObject } from 'react';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import getYCoordByValue from '../DataPlotters/getYCoordByValue';
import resetStyling from '../ChartStylers.ts/resetStyling';
import getTextHeight from '../ChartStylers.ts/getTextHeight';
import drawYLinesAndLabels from './drawYLinesAndLabels';

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

export interface YLabelObject {
  labelText: string;
  yCoord: number;
}

const labelYAxis: Signature = ({
  yAxisLabels,
  chartBottom,
  chartTop,
  usableHeight,
  usableWidth,
  ctx,
  decorator,
}) => {
  const yAxisLabelObjectsArray: YLabelObject[] = yAxisLabels.map(
    (labelText) => {
      const value = Number(labelText);
      const yCoord = getYCoordByValue({
        chartBottom,
        chartTop,
        usableHeight: usableHeight.current,
        value,
      });
      return { labelText, yCoord };
    }
  );

  const textHeight = getTextHeight(ctx);

  resetStyling(ctx);
  ctx.textAlign = 'left';
  ctx.strokeStyle = setAlpha(coolGrey, 0.75);

  yAxisLabelObjectsArray.forEach((labelObject, index) => {
    drawYLinesAndLabels({
      ctx,
      labelObject,
      textHeight,
      index,
      yAxisLabelObjectsArray,
      usableHeight,
      usableWidth,
      decorator,
    });
  });
};

export default labelYAxis;
