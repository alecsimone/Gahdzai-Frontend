import { coolGrey } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import makeStepList from './makeStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';

const makeHorizontalLines = (
  ctx: CanvasRenderingContext2D,
  usableWidth: number,
  usableHeight: number,
  top: number,
  bottom: number
) => {
  const stepList = makeStepList(top, bottom, usableHeight, 'vertical');

  // Now we can begin drawing our lines.
  ctx.strokeStyle = setAlpha(coolGrey, 0.4);
  // We loop through our steps, again skipping the last step as we don't need a line at the top of the chart.
  for (let i = 0; i <= stepList.length - 1; i += 1) {
    const thisLineY = drawLineAtValue(
      ctx,
      stepList[i],
      i === stepList.length - 1,
      usableHeight,
      top,
      bottom,
      usableWidth,
      'horizontal'
    );

    labelAxis(
      ctx,
      stepList,
      i,
      usableHeight,
      thisLineY,
      usableWidth,
      top,
      bottom,
      'horizontal'
    );
  }
};
export default makeHorizontalLines;
