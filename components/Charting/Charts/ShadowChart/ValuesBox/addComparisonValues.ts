import { miniText } from '@/styles/constants/fontSizes';
import { white } from '@/styles/constants/colors';
import getLineColor from '../../ChartMakers/PercentageChange/getLineColor';
import type { ComparisonTextObject } from './getTextObjects';
import { valuesBoxCenterPad } from '../../constants';

// * Formats and adds the values for a comparison chart to the values box
type Signature = (dataObj: {
  ctx: CanvasRenderingContext2D;
  textObjects: ComparisonTextObject[];
  lineHeight: number;
  weightedMiddle: number;
  textPad: number;
  originY: number;
}) => void;

const addComparisonValues: Signature = ({
  ctx,
  textObjects,
  lineHeight,
  weightedMiddle,
  textPad,
  originY,
}) => {
  textObjects.forEach((obj, index) => {
    // Both parts of this line will have the same Y coordinate, which we can find now
    const yCoord = lineHeight / 2 + (index + 2) * lineHeight;

    // The symbol should be bold and in the color that the line/legend for it are in. It should also be right aligned to the weighted center of the box, then nudged back 1/2 pad
    const color = getLineColor({
      symbol: obj.symbol.replace(':', ''),
      lineIndex: index,
    });
    ctx.fillStyle = color;
    ctx.textAlign = 'right';
    ctx.font = `bold ${miniText} sans-serif`;

    ctx.fillText(
      obj.symbol,
      weightedMiddle - textPad * (valuesBoxCenterPad / 2),
      originY + yCoord
    );

    // The Value should be regular weight and full white, and it should be left aligned to the weighted center of the box, then nudged forward 1/2 pad
    ctx.font = `${miniText} sans-serif`;
    ctx.fillStyle = white;
    ctx.textAlign = 'left';
    ctx.fillText(
      obj.value,
      weightedMiddle + textPad * (valuesBoxCenterPad / 2),
      originY + yCoord
    );
  });
};

export default addComparisonValues;
