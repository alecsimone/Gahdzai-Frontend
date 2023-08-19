import { white } from '@/styles/constants/colors';
import { smallText } from '@/styles/constants/fontSizes';
import getCoordForValue from '../utils/getCoordForValue';
import { gutterPadding } from './constants';

const getTimeString = (time: number) => {
  const thisDate = new Date(time * 1000);
  const thisHour = thisDate.getHours();
  const thisMinute = `${
    thisDate.getMinutes() < 10 ? '0' : ''
  }${thisDate.getMinutes()}`;
  return `${thisHour}:${thisMinute}`;
};

const labelAxis = (
  ctx: CanvasRenderingContext2D,
  stepList: number[],
  i: number,
  usableSize: number,
  thisLineCoord: number,
  lineTerminus: number,
  chartOrigin: number,
  chartTerminus: number,
  direction: 'horizontal' | 'vertical'
) => {
  ctx.font = `${smallText} sans-serif`;
  ctx.fillStyle = white;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  if (direction === 'horizontal') {
    if (i === 0) {
      ctx.textBaseline = 'top';
    } else if (i === stepList.length - 1) {
      ctx.textBaseline = 'bottom';
    } else {
      ctx.textBaseline = 'middle';
    }
  }

  if (direction === 'vertical') {
    if (i === 0) {
      ctx.textAlign = 'start';
    } else {
      ctx.textAlign = 'center';
    }
  }

  let labelText: string;
  if (direction === 'vertical') {
    labelText = getTimeString(stepList[i]);
  } else {
    labelText = `${stepList[i]}`;
  }

  let skipLabel = false;

  if (i === 1) {
    const thisTextMeasurement = ctx.measureText(labelText);

    let thisTextOverhang: number;
    if (direction === 'horizontal') {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxAscent;
    } else {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxLeft;
    }
    const thisTextBoundary = thisLineCoord - thisTextOverhang;

    let previousText: string;
    if (direction === 'vertical') {
      previousText = getTimeString(stepList[i - 1]);
    } else {
      previousText = `${stepList[i - 1]}`;
    }

    const previousTextMeasurement = ctx.measureText(previousText);
    const previousLineCoord = getCoordForValue(
      stepList[i - 1],
      usableSize,
      chartOrigin,
      chartTerminus
    );

    let previousTextOverhang: number;
    if (direction === 'horizontal') {
      previousTextOverhang = previousTextMeasurement.actualBoundingBoxDescent;
    } else {
      previousTextOverhang = previousTextMeasurement.actualBoundingBoxRight;
    }
    const previousTextBoundary = previousLineCoord - previousTextOverhang;

    if (previousTextBoundary > thisTextBoundary + 10) {
      skipLabel = true;
    }
  }
  if (i === stepList.length - 2) {
    const thisTextMeasurement = ctx.measureText(labelText);

    let thisTextOverhang: number;
    if (direction === 'horizontal') {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxDescent;
    } else {
      thisTextOverhang = thisTextMeasurement.actualBoundingBoxRight;
    }

    const thisTextBoundary = thisLineCoord + thisTextOverhang;

    let nextText: string;
    if (direction === 'vertical') {
      nextText = getTimeString(stepList[i + 1]);
    } else {
      nextText = `${stepList[i + 1]}`;
    }

    const nextTextMeasurement = ctx.measureText(nextText);
    const nextLineCoord = getCoordForValue(
      stepList[i + 1],
      usableSize,
      chartOrigin,
      chartTerminus
    );

    let nextTextOverhang: number;
    if (direction === 'horizontal') {
      nextTextOverhang = nextTextMeasurement.actualBoundingBoxAscent;
    } else {
      nextTextOverhang = nextTextMeasurement.actualBoundingBoxLeft;
    }
    const nextTextBoundary = nextLineCoord - nextTextOverhang;

    if (thisTextBoundary + 10 > nextTextBoundary) {
      skipLabel = true;
    }
  }

  if (!skipLabel) {
    if (direction === 'horizontal') {
      ctx.fillText(labelText, lineTerminus + gutterPadding, thisLineCoord);
    } else if (direction === 'vertical') {
      ctx.fillText(labelText, thisLineCoord, lineTerminus + gutterPadding);
    }
  }
};

export default labelAxis;
