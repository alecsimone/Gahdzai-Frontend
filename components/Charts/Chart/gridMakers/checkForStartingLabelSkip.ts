import { LabelSkipCheckInterface } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getTimeString from '../utils/getTimeString';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

const checkForStartingLabelSkip = (dataObj: LabelSkipCheckInterface) => {
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
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxAscent;
  } else {
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxLeft;
  }
  const thisTextBoundary = thisLineCoord - thisTextOverhang;

  let previousText: string;
  if (lineDirection === 'vertical') {
    previousText = getTimeString(stepList[i - 1]);
  } else {
    previousText = `${stepList[i - 1]}`;
  }

  const previousTextMeasurement = ctx.measureText(previousText);
  const previousLineCoord = getCoordForValue(
    stepList[i - 1],
    usablePixelSize,
    chartOrigin,
    chartTerminus
  );

  let previousTextOverhang: number;
  if (lineDirection === 'horizontal') {
    previousTextOverhang = previousTextMeasurement.actualBoundingBoxDescent;
  } else {
    previousTextOverhang = previousTextMeasurement.actualBoundingBoxRight;
  }
  const previousTextBoundary = previousLineCoord + previousTextOverhang;

  if (previousTextBoundary > thisTextBoundary + 10) {
    shouldSkipLabel = true;
  }
  return shouldSkipLabel;
};

export default checkForStartingLabelSkip;
