import { white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';

const setUpFont = (ctx: CanvasRenderingContext2D) => {
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
};

export default setUpFont;
