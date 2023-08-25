import getCoordForValue from '../utils/getCoordForValue';
import { getTimeString } from './labelAxis';

interface LabelSkipCheckInterface {
  ctx: CanvasRenderingContext2D;
  i: number;
  labelText: string;
  lineDirection: 'horizontal' | 'vertical';
  thisLineCoord: number;
  stepList: number[];
  usablePixelSize: number;
  chartOrigin: number;
  chartTerminus: number;
}

const checkForLabelSkip = (dataObj: LabelSkipCheckInterface) => {
  const {
    ctx,
    i,
    labelText,
    lineDirection,
    thisLineCoord,
    stepList,
    usablePixelSize,
    chartOrigin,
    chartTerminus,
  } = dataObj;

  let shouldSkipLabel = false;

  if (i === 1) {
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
    const previousTextBoundary = previousLineCoord - previousTextOverhang;

    if (previousTextBoundary > thisTextBoundary + 10) {
      shouldSkipLabel = true;
    }
  }
  if (i === stepList.length - 2) {
    const thisTextMeasurement = ctx.measureText(labelText);

    let thisTextOverhang: number;
    if (lineDirection === 'horizontal') {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxDescent;
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
      nextTextOverhang = nextTextMeasurement.actualBoundingBoxAscent;
    } else {
      nextTextOverhang = nextTextMeasurement.actualBoundingBoxLeft;
    }
    const nextTextBoundary = nextLineCoord - nextTextOverhang;

    if (thisTextBoundary + 10 > nextTextBoundary) {
      shouldSkipLabel = true;
    }
  }

  return shouldSkipLabel;
};

export default checkForLabelSkip;
