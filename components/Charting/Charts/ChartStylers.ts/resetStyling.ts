import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

// * Sets the default chart styling
type Signature = (ctx: CanvasRenderingContext2D) => void;

const resetStyling: Signature = (ctx) => {
  ctx.strokeStyle = coolGrey;
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = setAlpha(white, 0.8);
};

export default resetStyling;
