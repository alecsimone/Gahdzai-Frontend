import { white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import getCoordForValue from '../utils/getCoordForValue';
import { gutterPadding } from './constants';
import checkForLabelSkip from './checkForLabelSkip';

interface LabelAxisInterface {
  ctx: CanvasRenderingContext2D;
  stepList: number[];
  i: number;
  usablePixelSize: number;
  thisLineCoord: number;
  lineTerminus: number;
  chartOrigin: number;
  chartTerminus: number;
  lineDirection: 'horizontal' | 'vertical';
}

export const getTimeString = (time: number) => {
  const thisDate = new Date(time * 1000);
  const thisHour = thisDate.getHours();
  const thisMinute = `${
    thisDate.getMinutes() < 10 ? '0' : ''
  }${thisDate.getMinutes()}`;
  return `${thisHour}:${thisMinute}`;
};

const labelAxis = (dataObj: LabelAxisInterface) => {
  const {
    ctx,
    stepList,
    i,
    usablePixelSize,
    thisLineCoord,
    lineTerminus,
    chartOrigin,
    chartTerminus,
    lineDirection,
  } = dataObj;

  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  if (lineDirection === 'horizontal') {
    if (i === 0) {
      ctx.textBaseline = 'top';
    } else if (i === stepList.length - 1) {
      ctx.textBaseline = 'bottom';
    } else {
      ctx.textBaseline = 'middle';
    }
  }

  if (lineDirection === 'vertical') {
    if (i === 0) {
      ctx.textAlign = 'start';
    } else {
      ctx.textAlign = 'center';
    }
  }

  let labelText: string;
  if (lineDirection === 'vertical') {
    labelText = getTimeString(stepList[i]);
  } else {
    labelText = `${stepList[i]}`;
  }

  const shouldSkipLabel = checkForLabelSkip({
    ctx,
    i,
    labelText,
    lineDirection,
    thisLineCoord,
    stepList,
    usablePixelSize,
    chartOrigin,
    chartTerminus,
  });

  if (!shouldSkipLabel) {
    if (lineDirection === 'horizontal') {
      ctx.fillText(labelText, lineTerminus + gutterPadding, thisLineCoord);
    } else if (lineDirection === 'vertical') {
      ctx.fillText(labelText, thisLineCoord, lineTerminus + gutterPadding);
    }
  }
};

export default labelAxis;
