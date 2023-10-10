import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, white } from '@/styles/constants/colors';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import makeStepList from './makeStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';
import { DirectionalChartData, DataPoint } from '../types';

const makeGridLines = (
  directionalChartData: DirectionalChartData,
  finalDatapoints?: DataPoint[]
) => {
  console.log(finalDatapoints);
  const { lineDirection, chartData } = directionalChartData;
  const { ctx, chartType } = chartData;

  const stepList = makeStepList(directionalChartData);

  const lineOpacity = lineDirection === 'horizontal' ? 0.5 : 0.2;

  for (let i = 0; i <= stepList.length - 1; i += 1) {
    ctx.strokeStyle = setAlpha(coolGrey, lineOpacity);
    if (lineDirection === 'horizontal' && makeSafeDecimals(stepList[i]) === 0) {
      ctx.strokeStyle = white;
    }
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
      chartType,
    });
  }
};
export default makeGridLines;
