import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';

// * Sets the default chart styling
type Signature = (ctx: CanvasRenderingContext2D) => void;

const setBasicStyling: Signature = (ctx) => {
  ctx.strokeStyle = coolGrey;
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;
};

export default setBasicStyling;
