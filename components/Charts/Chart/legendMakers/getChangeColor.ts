import { white } from '@/styles/constants/colors';
import {
  setAlpha,
  setLightness,
} from '@/styles/functions/modifyColorFunctions';
import { downColor, upColor } from '../constants';

const getChangeColor = (change: number): string => {
  let changeColor = white;
  if (change > 0) {
    changeColor = setAlpha(setLightness(upColor, 60), 0.8);
  } else if (change < 0) {
    changeColor = setLightness(downColor, 60);
  }
  return changeColor;
};

export default getChangeColor;
