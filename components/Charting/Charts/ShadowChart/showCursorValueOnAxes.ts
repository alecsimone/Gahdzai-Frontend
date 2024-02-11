import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import { coolGrey, lightBlack, midBlack } from '@/styles/constants/colors';
import drawRoundedRect from '@/utils/canvas/drawRoundedRect';
import getOneRem from '@/styles/functions/getOneRem';
import { setLightness } from '@/styles/functions/modifyColorFunctions';
import { smallText } from '@/styles/constants/fontSizes';
import makeNumberReadable from '@/utils/makeNumberReadable';
import type { ChartDataRange, Coordinate, UsableBoundaries } from '../types';
import resetStyling from '../ChartStylers.ts/resetStyling';
import { gutterPadding, usableBoundaryStrokeWidth } from '../constants';
import getTextHeight from '../ChartStylers.ts/getTextHeight';
import getYValueByCoord from '../DataPlotters/getYValueByCoord';

// * Displays the value (both time and price/percent change) of the point the cursor is over on the X and Y axes
type Signature = (dataObj: {
  shadowChart: HTMLCanvasElement;
  mouseCoords: Coordinate;
  usableBoundaries: UsableBoundaries;
  timeAtCursor: number;
  chartDataRange: ChartDataRange;
  decorator?: string;
}) => void;

const showCursorValueOnAxes: Signature = ({
  shadowChart,
  mouseCoords,
  usableBoundaries: { usableHeight, usableWidth },
  timeAtCursor,
  chartDataRange: { chartTop, chartBottom },
  decorator,
}) => {
  const ctx = shadowChart.getContext('2d');
  if (ctx) {
    const timeAsDate = new Date(ensureMsTimestamp(timeAtCursor));
    let timeString = new Intl.DateTimeFormat('en-us', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }).format(timeAsDate);
    if (timeString.startsWith('0')) {
      timeString = timeString.substring(1);
    }

    const valueAtCursor = getYValueByCoord({
      y: mouseCoords.y,
      chartTop,
      chartBottom,
      usableHeight: usableHeight.current,
    });
    const valueString = `${makeNumberReadable({ number: valueAtCursor })}${
      decorator != null ? decorator : ''
    }`;

    resetStyling(ctx);
    const pad = getOneRem() / 2;

    ctx.font = `bold ${smallText} sans-serif`;
    const { width: textWidthX } = ctx.measureText(timeString);
    const { width: textWidthY } = ctx.measureText(valueString);

    const textHeight = getTextHeight(ctx);

    const xLabelYCoord =
      usableHeight.current + gutterPadding + usableBoundaryStrokeWidth;
    // Now we can put our label on the x-axis. First we draw the rounded rectangle it will go on top of
    drawRoundedRect({
      ctx,
      rectangle: {
        x: mouseCoords.x - textWidthX / 2 - pad / 2,
        y: xLabelYCoord - 4,
        width: textWidthX + pad,
        height: textHeight + 4,
        roundingRadius: 3,
      },
      style: {
        fillColor: setLightness(coolGrey, 40),
        strokeColor: lightBlack,
        strokeWidth: 1,
      },
    });

    // And then we add the text
    ctx.fillStyle = midBlack;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText(timeString, mouseCoords.x, xLabelYCoord);

    const yLabelXCoord =
      usableWidth.current + gutterPadding + usableBoundaryStrokeWidth;
    // Next we can put our label on the y-axis. First we draw the rounded rectangle it will go on top of
    drawRoundedRect({
      ctx,
      rectangle: {
        x: yLabelXCoord - 4,
        y: mouseCoords.y - textHeight / 2 - pad / 2,
        width: textWidthY + pad,
        height: textHeight + 4,
        roundingRadius: 3,
      },
      style: {
        fillColor: setLightness(coolGrey, 40),
        strokeColor: lightBlack,
        strokeWidth: 1,
      },
    });

    // And then we add the text
    ctx.fillStyle = midBlack;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(valueString, yLabelXCoord, mouseCoords.y);
  }
};

export default showCursorValueOnAxes;
