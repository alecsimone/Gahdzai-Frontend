import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import makeStepList from './makeStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';
import { DirectionalChartData } from '../types';

const makeGridLines = (directionalChartData: DirectionalChartData) => {
  const { lineDirection, chartData } = directionalChartData;
  const { ctx } = chartData;

  const stepList = makeStepList(directionalChartData);

  const lineOpacity = lineDirection === 'horizontal' ? 0.5 : 0.2;
  ctx.strokeStyle = setAlpha(coolGrey, lineOpacity);

  for (let i = 0; i <= stepList.length - 1; i += 1) {
    const thisLineCoord = drawLineAtValue({
      value: stepList[i],
      isStrongLine: i === stepList.length - 1,
      directionalChartData,
    });

    labelAxis({
      stepList,
      i,
      thisLineCoord,
      directionalChartData,
    });
  }
};
export default makeGridLines;
