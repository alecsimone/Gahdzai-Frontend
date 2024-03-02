import getOneRem from '@/styles/functions/getOneRem';
import { scaleFactor } from '../constants';

// * Resets the styling for our fonts for chart labels
type Signature = (ctx: CanvasRenderingContext2D) => void;

const setLabelFont: Signature = (ctx) => {
  const fontSize = getOneRem() * 1.7 * scaleFactor;
  ctx.font = `${fontSize}px sans-serif`;
};

export default setLabelFont;
