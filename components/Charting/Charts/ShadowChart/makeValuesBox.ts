import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import makeNumberReadable from '@/utils/makeNumberReadable';
import { miniText } from '@/styles/constants/fontSizes';
import getOneRem from '@/styles/functions/getOneRem';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, lightBlack, white } from '@/styles/constants/colors';
import getTextHeight from '../ChartStylers.ts/getTextHeight';
import type { CoordinatedDataPoint } from '../types';
import resetStyling from '../ChartStylers.ts/resetStyling';
import getLineColor from '../ChartMakers/PercentageChange/getLineColor';
import getWidestLabelWidth from '../ChartLabelers.ts/getWidestLabelWidth';

// * Given a set of CoordinatedDataPoints (presumably ones that correspond to the current cursor's position), make a little box presenting them all in a nice looking way
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  coordinatedDataPoints: CoordinatedDataPoint[];
  origin?: {
    x: number;
    y: number;
  };
}) => void;

interface ValuesTextObject {
  symbol: string;
  value: string;
}

const makeValuesBox: Signature = ({
  ctx,
  coordinatedDataPoints,
  origin = { x: 5, y: 8 },
}) => {
  // First some basic styling. We use textBaseline middle because we want to make sure everything on each line is center aligned
  resetStyling(ctx);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${miniText} sans-serif`;

  // And some basic calculations about our text. First we need to figure out how high a line of text is, making sure we've set our font to bold so it will be the bigger size
  const textHeight = getTextHeight(ctx);
  const textHeightWithBuffer = textHeight * 1.5;

  // And then we want to get our basic padding unit, which will be 0.5rem
  const textPad = getOneRem() / 2;

  // Now we make a list of all the text we're going to display for the dataPoints so we can figure out how big the rectangle needs to be
  const valuesTextObjects: ValuesTextObject[] = [];
  coordinatedDataPoints.forEach((point) => {
    if ('change' in point.data) {
      const symbolText = `${point.symbol}:`;
      const valueText = `${makeNumberReadable({
        number: point.data.change,
      })}%`;
      valuesTextObjects.push({
        symbol: symbolText,
        value: `${point.data.change > 0 ? '+' : ''}${valueText}`,
      });
    }
  });

  // We get the widest symbol's width and the widest value's width
  const widestSymbolWidth = getWidestLabelWidth(
    ctx,
    valuesTextObjects.map((obj) => obj.symbol)
  );
  const widestValueWidth = getWidestLabelWidth(
    ctx,
    valuesTextObjects.map((obj) => obj.value)
  );

  // Then we add those together along with 4 units of padding (It should be 1 for the middle and 1.5 for either side)
  const rawRectWidth = widestSymbolWidth + widestValueWidth + 4 * textPad;
  const rectWidth = Math.ceil(rawRectWidth / 25) * 25;

  // Visually, the center line we want to align our text with is not necessarily the center of the box, because the symbols and the values might be different sizes. So we want to use the end of the natural position of the symbol as our center line
  const weightedMiddle = origin.x + widestSymbolWidth + textPad * 2;

  // We want the box to be 1 textPad taller than it needs to be, and then we want to offset it by -1/2 text pads so the box will have some vertical padding inside it
  const rectHeight =
    (coordinatedDataPoints.length + 2) * textHeightWithBuffer + textPad; // The +2 is for the time and date strings
  const rectStart = origin.y - textPad / 2;

  // Then we draw the box we're going to put all this on top of
  ctx.fillStyle = lightBlack;
  ctx.fillRect(origin.x, rectStart, rectWidth, rectHeight);
  ctx.strokeStyle = coolGrey;
  ctx.setLineDash([]);
  ctx.strokeRect(origin.x, rectStart, rectWidth, rectHeight);

  // Now we can make our time and date strings. All these datapoints should have the same time (because that's how they were found in the first place, all the datapoints with a given time), so we can just use the first one.
  const timeAsDate = new Date(
    ensureMsTimestamp(coordinatedDataPoints[0]!.data.time)
  );
  const dateString = new Intl.DateTimeFormat('en-US').format(timeAsDate);
  const timeString = new Intl.DateTimeFormat('en-us', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(timeAsDate);

  // And now we can add the time and date strings centered in our box on lines 1 and 2
  ctx.textAlign = 'center';
  ctx.fillStyle = setAlpha(white, 0.6);
  ctx.font = `${miniText} sans-serif`;
  ctx.fillText(
    dateString,
    // origin.x + rectWidth / 2,
    weightedMiddle,
    origin.y + textHeightWithBuffer / 2
  );
  ctx.fillStyle = white;
  ctx.fillText(
    timeString,
    // origin.x + rectWidth / 2,
    weightedMiddle,
    origin.y + textHeightWithBuffer * 1.5
  );

  // And now we can Add our values
  valuesTextObjects.forEach((obj, index) => {
    // Both parts of this line will have the same Y coordinate, which we can find now
    const yCoord =
      textHeightWithBuffer / 2 + (index + 2) * textHeightWithBuffer;

    // The symbol should be bold and in the color that the line/legend for it are in. It should also be right aligned to the weighted center of the box, then nudged back 1/2 pad
    const color = getLineColor({
      symbol: obj.symbol.replace(':', ''),
      lineIndex: index,
    });
    ctx.fillStyle = color;
    ctx.textAlign = 'right';
    ctx.font = `bold ${miniText} sans-serif`;

    ctx.fillText(obj.symbol, weightedMiddle - textPad / 2, origin.y + yCoord);

    // The Value should be regular weight and full white, and it should be left aligned to the weighted center of the box, then nudged forward 1/2 pad
    ctx.font = `${miniText} sans-serif`;
    ctx.fillStyle = white;
    ctx.textAlign = 'left';
    ctx.fillText(obj.value, weightedMiddle + textPad / 2, origin.y + yCoord);
  });
};

export default makeValuesBox;
