import { ChartData, DataPoint } from '../types';
import getXValueByIndex from '../utils/getXValueByIndex';
import drawLineAtValue from './drawLineAtValue';
import getMaxSteps from './getMaxSteps';
import labelAxis from './labelAxis';

interface RelevantDatesObjectInterface {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
}

const makeVerticalGridLines = (
  chartData: ChartData,
  finalDatapoints: DataPoint[]
) => {
  // So we divide the number of data points by the number of steps
  const { usableWidth } = chartData;
  const maxSteps = getMaxSteps(usableWidth);
  const pointsPerStep = Math.round(finalDatapoints.length / maxSteps);

  const relevantDatesObjArray: RelevantDatesObjectInterface[] = [];
  const stepList: number[] = [];
  const coordsArray: number[] = [];
  for (let i = 0; i < maxSteps; i += 1) {
    // Then we figure out what date each step starts on
    const firstPointOfStep = finalDatapoints[i * pointsPerStep];
    const firstTimeOfStep = parseInt(firstPointOfStep.time, 10);
    const firstDateObjOfStep = new Date(firstTimeOfStep * 1000);
    const relevantDatesObj = {
      year: firstDateObjOfStep.getFullYear(),
      month: firstDateObjOfStep.getMonth(),
      date: firstDateObjOfStep.getDate(),
      hour: firstDateObjOfStep.getHours(),
      minute: firstDateObjOfStep.getMinutes(),
    };
    relevantDatesObjArray.push(relevantDatesObj);

    if (i === 0) {
      const labelString = `${relevantDatesObj.month + 1}/${
        relevantDatesObj.date
      } ${relevantDatesObj.hour}:${relevantDatesObj.minute < 10 ? '0' : ''}${
        relevantDatesObj.minute
      }`;
      stepList.push(firstTimeOfStep);
    } else {
      const lastRelevantDatesObj = relevantDatesObjArray[i - 1];

      let labelString = '';
      if (lastRelevantDatesObj.year !== relevantDatesObj.year) {
        labelString = `${relevantDatesObj.year}`;
      } else if (
        lastRelevantDatesObj.month !== relevantDatesObj.month ||
        lastRelevantDatesObj.date !== relevantDatesObj.date
      ) {
        labelString = `${relevantDatesObj.month + 1}/${relevantDatesObj.date}`;
      } else if (
        lastRelevantDatesObj.hour !== relevantDatesObj.hour ||
        lastRelevantDatesObj.minute !== relevantDatesObj.minute
      ) {
        labelString = `${relevantDatesObj.hour}:${
          relevantDatesObj.minute < 10 ? '0' : ''
        }${relevantDatesObj.minute}`;
      }
      stepList.push(firstTimeOfStep);
    }
    const xCoord = getXValueByIndex(
      chartData.usableWidth,
      i * pointsPerStep,
      finalDatapoints.length
    );
    coordsArray.push(xCoord);
    drawLineAtValue({
      value: xCoord,
      directionalChartData: {
        lineDirection: 'vertical',
        chartData,
      },
      isStrongLine: false,
    });
  }
  stepList.forEach((step, i) => {
    labelAxis({
      chartType: 'PercentChange',
      directionalChartData: {
        lineDirection: 'vertical',
        chartData,
      },
      i,
      stepList,
      thisLineCoord: coordsArray[i],
    });
  });
};

export default makeVerticalGridLines;
