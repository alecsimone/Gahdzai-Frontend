import { white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import { gutterPadding } from '../constants';
import checkForLabelSkip from './checkForLabelSkip';
import { DirectionalChartData, ChartTypes } from '../types';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

interface LabelAxisInterface {
  labelsList: string[];
  i: number;
  thisLineCoord: number;
  directionalChartData: DirectionalChartData;
  chartType: ChartTypes;
}

const labelAxis = (dataObj: LabelAxisInterface) => {
  const { labelsList, i, thisLineCoord, directionalChartData } = dataObj;

  const { lineDirection, chartData } = directionalChartData;
  const { ctx } = chartData;

  const { lineTerminus } = getChartShapeFromChartData(directionalChartData);

  // Technically we've done this already, but let's just make sure nothing changed it between here and there
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  if (lineDirection === 'horizontal') {
    if (i === 0) {
      ctx.textBaseline = 'top';
    } else if (i === labelsList.length - 1) {
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

  const labelText = labelsList[i];

  const shouldSkipLabel = checkForLabelSkip({
    labelsList,
    i,
    thisLineCoord,
    labelText,
    directionalChartData,
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
