import { LabelSkipCheckInterface } from '../types';
import getCoordForValue from '../utils/getCoordForValue';
import getChartShapeFromChartData from '../chartShapers/getChartShapeFromChartData';

const checkForStartingLabelSkip = (dataObj: LabelSkipCheckInterface) => {
  const { labelsList, i, thisLineCoord, labelText, directionalChartData } =
    dataObj;

  const { chartData, lineDirection } = directionalChartData;
  const { ctx } = chartData;
  const { usablePixelSize, chartOrigin, chartTerminus } =
    getChartShapeFromChartData(directionalChartData);

  let shouldSkipLabel = false;

  const thisTextMeasurement = ctx.measureText(labelText);

  let thisTextOverhang: number;
  if (lineDirection === 'horizontal') {
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxAscent; // For height, fontBoundingBox seems to be more accurate
  } else {
    thisTextOverhang = thisTextMeasurement.actualBoundingBoxLeft; // For width, actualBoundingBox seems to be more accurate
  }
  const thisTextBoundary = thisLineCoord - thisTextOverhang;

  const previousText = labelsList[i - 1];
  // let previousText: string;
  // if (lineDirection === 'vertical') {
  //   previousText = getTimeString(labelsList[i - 1]);
  // } else {
  //   previousText = `${labelsList[i - 1]}`;
  // }

  const previousTextMeasurement = ctx.measureText(previousText);
  const previousLineCoord = getCoordForValue(
    labelsList[i - 1],
    usablePixelSize,
    chartOrigin,
    chartTerminus
  );

  let previousTextOverhang: number;
  if (lineDirection === 'horizontal') {
    previousTextOverhang = previousTextMeasurement.fontBoundingBoxDescent; // For height, fontBoundingBox seems to be more accurate
  } else {
    previousTextOverhang = previousTextMeasurement.width; // I believe we need to use width because the text is aligned to the left, so the actualBoundingBoxRight seems to only get half of its true width
  }

  const previousTextBoundary = previousLineCoord + previousTextOverhang;

  if (previousTextBoundary + 6 > thisTextBoundary) {
    shouldSkipLabel = true;
  }
  return shouldSkipLabel;
};

export default checkForStartingLabelSkip;
