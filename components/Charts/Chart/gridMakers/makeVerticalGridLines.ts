import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { coolGrey } from '@/styles/constants/colors';
import {
  ChartData,
  DataPoint,
  DirectionalChartData,
  PeriodTypes,
} from '../types';
import getXValueByIndex from '../utils/getXValueByIndex';
import drawLineAtValue from './drawLineAtValue';
import getMaxSteps from './getMaxSteps';
import getRelevantDatesObject, {
  RelevantDatesObjectInterface,
} from './getRelevantDatesObject';
import labelAxis from './labelAxis';

// * Draw the vertical lines on our grid. This requires the following steps:
// - Calculate how many steps we can fit on the grid
// - Figure out how many of our datapoints will fit in each step
// - Decide what the period of the step will be. For instance, in a daily chart the period will probably be hours. In a monthly chart, it might be days or weeks
// - Split up the data based on those periods by finding the first datapoint that matches the period
// - Use that datapoint to get the x coordinate of the line for the period

type Signature = (
  chartData: ChartData,
  finalDatapoints: DataPoint[],
  test: Test
) => void;
// > Side Effects:
// > drawLineAtValue() to actually draw the grid lines on the grid
// > labelAxis() to label the grid line

interface LabelObject {
  labelText: string;
  xCoord: number;
}

const makeVerticalGridLines: Signature = (chartData, finalDatapoints) => {
  const { ctx, usableWidth } = chartData;

  // - Calculate how many steps we can fit on the grid
  const maxSteps = getMaxSteps(usableWidth);

  // - Figure out how many of our datapoints will fit in each step
  const pointsPerStep = Math.round(finalDatapoints.length / maxSteps);

  // - Decide what the period of the step will be
  const firstDateObj = new Date(parseInt(finalDatapoints[0].time, 10) * 1000);
  const firstRelevantDatesObj: RelevantDatesObjectInterface = {
    year: firstDateObj.getFullYear(),
    month: firstDateObj.getMonth(),
    date: firstDateObj.getDate(),
    hour: firstDateObj.getHours(),
    minute: firstDateObj.getMinutes(),
  };

  const lastDateObj = new Date(
    parseInt(finalDatapoints[finalDatapoints.length - 1].time, 10) * 1000
  );
  const lastRelevantDatesObj: RelevantDatesObjectInterface = {
    year: lastDateObj.getFullYear(),
    month: lastDateObj.getMonth(),
    date: lastDateObj.getDate(),
    hour: lastDateObj.getHours(),
    minute: lastDateObj.getMinutes(),
  };

  let periodType: PeriodTypes = 'minute' as PeriodTypes;
  let range: number = 0;
  const possibleRanges: PeriodTypes[] = ['year', 'month', 'date', 'hour'];
  possibleRanges.forEach((possibleRange, index) => {
    if (
      periodType === 'minute' && // Only keep checking if we haven't already reassigned it
      lastRelevantDatesObj[possibleRange] !==
        firstRelevantDatesObj[possibleRange]
    ) {
      const rangeSize =
        lastRelevantDatesObj[possibleRange] -
        firstRelevantDatesObj[possibleRange];
      if (rangeSize > maxSteps / 2) {
        periodType = possibleRange;
        range = rangeSize;
      } else if (possibleRanges[index + 1] != null) {
        periodType = possibleRanges[index + 1];
        const nextRangeSize =
          lastRelevantDatesObj[periodType] - firstRelevantDatesObj[periodType];
        if (possibleRange === 'year') {
          range = 12 * rangeSize + nextRangeSize;
        } else if (possibleRange === 'month') {
          range = 30 * rangeSize + nextRangeSize;
        } else if (possibleRange === 'date') {
          range = 24 * rangeSize + nextRangeSize;
        } else if (possibleRange === 'hour') {
          range = 60 * rangeSize + nextRangeSize;
        }
      } else {
        const nextRangeSize =
          lastRelevantDatesObj.minute - firstRelevantDatesObj.minute;
        range = 60 * rangeSize + nextRangeSize;
      }
    }
  });
  const rawPeriod = range / maxSteps;
  const period = Math.ceil(rawPeriod / 5) * 5;

  // - Now we loop over our FinalDatapoints. When we get to one that is 1 period away from the last one, we get the x coord and label text for that datapoint
  const labelObjectsArray: LabelObject[] = [];
  let firstLabelText = '';
  if (periodType === 'year') {
    firstLabelText += `${firstRelevantDatesObj.year} `;
  }
  firstLabelText += `${firstRelevantDatesObj.month + 1}/${
    firstRelevantDatesObj.date
  } ${firstRelevantDatesObj.hour}:${
    firstRelevantDatesObj.minute < 10
      ? `0${firstRelevantDatesObj.minute}`
      : firstRelevantDatesObj.minute
  }`;
  labelObjectsArray.push({
    labelText: firstLabelText,
    xCoord: getXValueByIndex(usableWidth, 0, finalDatapoints.length),
  });

  let nextPeriodRelevantDatesObj = {
    ...firstRelevantDatesObj,
    [periodType]: firstRelevantDatesObj[periodType] + period - 1,
  };
  finalDatapoints.forEach((dataPoint, index) => {
    const { time } = dataPoint;
    const xCoord = getXValueByIndex(usableWidth, index, finalDatapoints.length);

    const relevantDatesObj = getRelevantDatesObject(time);
    const periodTypes: PeriodTypes[] = [
      'year',
      'month',
      'date',
      'hour',
      'minute',
    ];
    let doneLooping = false;
    periodTypes.forEach((type) => {
      if (
        !doneLooping &&
        relevantDatesObj[type] > nextPeriodRelevantDatesObj[type]
      ) {
        let labelText = '';
        if (type === 'year') {
          labelText = `${relevantDatesObj.year}`;
        } else if (type === 'month' || type === 'date') {
          labelText = `${relevantDatesObj.month + 1}/${relevantDatesObj.date}`;
        } else if (type === 'hour' || type === 'minute') {
          labelText = `${relevantDatesObj.hour}:${
            relevantDatesObj.minute < 10
              ? `0${relevantDatesObj.minute}`
              : relevantDatesObj.minute
          }`;
        }
        labelObjectsArray.push({
          labelText,
          xCoord,
        });
        nextPeriodRelevantDatesObj = {
          ...relevantDatesObj,
          [periodType]: relevantDatesObj[periodType] + period - 1,
        };
      }
      if (type === periodType) {
        doneLooping = true;
      }
    });
  });

  ctx.strokeStyle = setAlpha(coolGrey, 0.2);
  const labelsList = labelObjectsArray.map((labelObj) => labelObj.labelText);
  labelObjectsArray.forEach(({ labelText, xCoord }, i) => {
    const directionalChartData: DirectionalChartData = {
      lineDirection: 'vertical',
      chartData,
    };

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
};

export default makeVerticalGridLines;
