import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, white } from '@/styles/constants/colors';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import makeNumberReadable from '@/utils/makeNumberReadable';
import makeStepList from './makeStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';
import { DirectionalChartData } from '../types';

const makeGridLines = (directionalChartData: DirectionalChartData) => {
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

    const labelsList = stepList.map((step) => {
      let labelText = `${makeNumberReadable({ number: step })}`;
      if (chartType === 'PercentChange') {
        labelText += '%';
      }
      return labelText;
    });

    labelAxis({
      labelsList,
      i,
      thisLineCoord,
      directionalChartData,
      chartType,
    });
  }
};
export default makeGridLines;
