import { coolGrey, white } from '@/styles/constants/colors';
import getOneRem from '@/styles/functions/getOneRem';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { scaleFactor } from '../constants';

// * Sets the default chart styling
type Signature = (ctx: CanvasRenderingContext2D) => void;

export const defaultFontSize = getOneRem() * 2.25 * scaleFactor;

const resetStyling: Signature = (ctx) => {
  ctx.strokeStyle = coolGrey;

  ctx.font = `${defaultFontSize}px sans-serif`;
  ctx.fillStyle = setAlpha(white, 0.8);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
};

export default resetStyling;
