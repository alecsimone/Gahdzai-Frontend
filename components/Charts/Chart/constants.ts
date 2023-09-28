import { green, red } from '@/styles/constants/colors';
import {
  setAlpha,
  setSaturation,
} from '@/styles/functions/modifyColorFunctions';

// export const horizontalGutter = 40;
export const verticalGutter = 90;

export const gutterPadding = 10;

export const downColor = setAlpha(setSaturation(red, 65), 1);
export const upColor = setAlpha(green, 0.9);

export const minimumCandleWidth = 3;

export const resolution = 1;
