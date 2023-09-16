import { LabelSkipCheckInterface } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getTimeString from '../utils/getTimeString';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

const checkForEndingLabelSkip = (dataObj: LabelSkipCheckInterface) => {
  const { stepList, i, thisLineCoord, labelText, directionalChartData } =
    dataObj;

  const { chartData, lineDirection } = directionalChartData;
  const { ctx } = chartData;
  const { usablePixelSize, chartOrigin, chartTerminus } =
    getChartShapeFromChartData(directionalChartData);

  let shouldSkipLabel = false;

  const thisTextMeasurement = ctx.measureText(labelText);

  let thisTextOverhang: number;
  if (lineDirection === 'horizontal') {
    thisTextOverhang = thisTextMeasurement.fontBoundingBoxDescent;
  } else {
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxRight;
  }

  const thisTextBoundary = thisLineCoord + thisTextOverhang;

  let nextText: string;
  if (lineDirection === 'vertical') {
    nextText = getTimeString(stepList[i + 1]);
  } else {
    nextText = `${stepList[i + 1]}`;
  }

  const nextTextMeasurement = ctx.measureText(nextText);
  const nextLineCoord = getCoordForValue(
    stepList[i + 1],
    usablePixelSize,
    chartOrigin,
    chartTerminus
  );

  let nextTextOverhang: number;
  if (lineDirection === 'horizontal') {
    nextTextOverhang = nextTextMeasurement.fontBoundingBoxAscent;
  } else {
    nextTextOverhang = nextTextMeasurement.actualBoundingBoxLeft;
  }
  const nextTextBoundary = nextLineCoord - nextTextOverhang;

  if (thisTextBoundary + 10 > nextTextBoundary) {
    shouldSkipLabel = true;
  }
  return shouldSkipLabel;
};

export default checkForEndingLabelSkip;
