import { coolGrey, white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { gutterPadding } from './constants';
import getCoordForValue from '../utils/getCoordForValue';
import makeStepList from './makeStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';

const getTimeString = (time: number) => {
  const thisDate = new Date(time * 1000);
  const thisHour = thisDate.getHours();
  const thisMinute = `${
    thisDate.getMinutes() < 10 ? '0' : ''
  }${thisDate.getMinutes()}`;
  return `${thisHour}:${thisMinute}`;
};

const makeVerticalLines = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  start: number,
  end: number
) => {
  const stepList = makeStepList(end, start, usableWidth, 'horizontal');

  ctx.strokeStyle = setAlpha(coolGrey, 0.2);

  for (let i = 0; i <= stepList.length - 1; i += 1) {
    const thisLineX = drawLineAtValue(
      ctx,
      stepList[i],
      i === stepList.length - 1,
      usableWidth,
      start,
      end,
      usableHeight,
      'vertical'
    );

    labelAxis(
      ctx,
      stepList,
      i,
      usableWidth,
      thisLineX,
      usableHeight,
      start,
      end,
      'vertical'
    );
  }
};
export default makeVerticalLines;
