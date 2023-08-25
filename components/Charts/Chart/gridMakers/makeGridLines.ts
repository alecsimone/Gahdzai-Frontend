import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import makeStepList from './makeStepList';
import { coolGrey } from '@/styles/constants/colors';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';

export interface LineMakingInterface {
  ctx: CanvasRenderingContext2D;
  lineTerminus: number;
  usablePixelSize: number;
  originValue: number;
  terminusValue: number;
}

const makeGridLines = (
  lineDirection: 'horizontal' | 'vertical',
  lineMakingDataObj: LineMakingInterface
) => {
  const { ctx, lineTerminus, usablePixelSize, originValue, terminusValue } =
    lineMakingDataObj;

  const stepList = makeStepList({
    max: lineDirection === 'horizontal' ? originValue : terminusValue,
    min: lineDirection === 'horizontal' ? terminusValue : originValue,
    usablePixelSize,
    lineDirection,
  });

  const lineOpacity = lineDirection === 'horizontal' ? 0.5 : 0.2;
  ctx.strokeStyle = setAlpha(coolGrey, lineOpacity);

  for (let i = 0; i <= stepList.length - 1; i += 1) {
    const thisLineCoord = drawLineAtValue({
      ctx,
      value: stepList[i],
      isStrongLine: i === stepList.length - 1,
      usablePixelSize,
      chartOrigin: originValue,
      chartTerminus: terminusValue,
      lineTerminus,
      lineDirection,
    });

    labelAxis({
      ctx,
      stepList,
      i,
      usablePixelSize,
      thisLineCoord,
      lineTerminus,
      chartOrigin: originValue,
      chartTerminus: terminusValue,
      lineDirection,
    });
  }
};
export default makeGridLines;
