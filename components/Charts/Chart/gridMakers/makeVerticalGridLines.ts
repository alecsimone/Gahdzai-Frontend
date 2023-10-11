import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import { ChartData, DataPoint, DirectionalChartData } from '../types';
import drawLineAtValue from './drawLineAtValue';
import labelAxis from './labelAxis';
import getTimePeriod from './getTimePeriod';
import makeTimeLabelObjectsArray from './makeTimeLabelObjectsArray';

// * Draw the vertical lines on our grid. We need to figure out how frequently they should come first, then figure out how to label them properly. We also need to make sure to draw a final line at the end of the chart.

type Signature = (chartData: ChartData, finalDatapoints: DataPoint[]) => void;
// > Side Effects:
// > drawLineAtValue() to actually draw the grid lines on the grid
// > labelAxis() to label the grid line

const makeVerticalGridLines: Signature = (chartData, finalDatapoints) => {
  const { ctx, usableWidth } = chartData;

  const { period, periodType } = getTimePeriod(usableWidth, finalDatapoints);

  const labelObjectsArray = makeTimeLabelObjectsArray({
    datapoints: finalDatapoints,
    period,
    periodType,
    usableWidth,
  });

  const directionalChartData: DirectionalChartData = {
    lineDirection: 'vertical',
    chartData,
  };

  ctx.strokeStyle = setAlpha(coolGrey, 0.2);
  const labelsList = labelObjectsArray.map((labelObj) => labelObj.labelText);
  labelObjectsArray.forEach(({ xCoord }, i) => {
    drawLineAtValue({
      value: xCoord,
      isStrongLine: false,
      directionalChartData,
    });

    labelAxis({
      labelsList,
      i,
      thisLineCoord: xCoord,
      directionalChartData,
      chartType: 'PercentChange',
    });
  });

  ctx.strokeStyle = setAlpha(coolGrey, 0.5);
  drawLineAtValue({
    value: usableWidth,
    isStrongLine: false,
    directionalChartData,
  });
};

export default makeVerticalGridLines;
