import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey, white } from '@/styles/constants/colors';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import makeNumberReadable from '@/utils/makeNumberReadable';
import makeHorizontalStepList from './makeHorizontalStepList';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';
import type { ChartData, DirectionalChartData } from '../types';

// * Makes the horizontal grid lines for a chart, ie, the ones corresponding to the Y-axis
type Signature = (chartData: ChartData) => void;

const makeHorizontalGridLines: Signature = (chartData) => {
  const { ctx, chartType } = chartData;
  const directionalChartData: DirectionalChartData = {
    lineDirection: 'horizontal',
    chartData,
  };

  const stepList = makeHorizontalStepList(directionalChartData);

  const lineOpacity = 0.5;

  for (let i = 0; i < stepList.length; i += 1) {
    const thisStep = stepList[i];

    if (thisStep !== undefined) {
      ctx.strokeStyle = setAlpha(coolGrey, lineOpacity);
      if (makeSafeDecimals(thisStep) === 0) {
        ctx.strokeStyle = white;
      }
      const thisLineCoord = drawLineAtValue({
        value: thisStep,
        isStrongLine: i === stepList.length - 1,
        directionalChartData,
      });
      const labelsList = stepList.map((step) => {
        let labelText = makeNumberReadable({ number: step });
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
  }
};
export default makeHorizontalGridLines;
