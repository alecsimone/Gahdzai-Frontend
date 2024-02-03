import { blue, green, red } from '@/styles/constants/colors';
import {
  setAlpha,
  setSaturation,
} from '@/styles/functions/modifyColorFunctions';

export const gutterPadding = 10;

export const downColor = setAlpha(setSaturation(red, 65), 1);
export const upColor = setAlpha(green, 0.9);

export const usableBoundaryStrokeWidth = 1;

export const defaultLineColor = blue;

export const defaultLineWidth = 3;
export const highlightedLineWidth = 5;
export const notHighlightedLineWidth = 1;

export const defaultLineAlpha = 0.8;
export const highlightedSymbolAlpha = 1;
export const notHighlightedSymbolAlpha = 0.25;
