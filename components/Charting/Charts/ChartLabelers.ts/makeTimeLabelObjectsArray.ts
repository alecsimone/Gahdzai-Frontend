import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import { type TimeTypes, timeTypes } from '../types';
import getXCoordByIndex from '../DataPlotters/getXCoordByIndex';
import getFirstTimeLabelText from './getFirstTimeLabelText';
import getLabelTextFromRelevantDates from './getLabelTextFromRelevantDates';
import getRelevantDatesObject from './getRelevantDatesObject';
import increaseDateByPeriod from './increaseDateByPeriod';

// * Turns datapoints into an array of the labelObjects we need to make the vertical grid lines of the periods of that data
type Signature = (obj: {
  timesArray: number[];
  time: number;
  timeStepType: TimeTypes;
  usableWidth: number;
}) => LabelObject[];

interface LabelObject {
  labelText: string;
  xCoord: number;
}

const makeTimeLabelObjectsArray: Signature = ({
  timesArray,
  time,
  timeStepType,
  usableWidth,
}) => {
  const firstTime = timesArray[0]!;
  const labelObjectsArray: LabelObject[] = [
    {
      labelText: getFirstTimeLabelText(firstTime, timeStepType),
      xCoord: getXCoordByIndex(usableWidth, 0, timesArray.length),
    },
  ];

  let lastRelevantDatesObj = getRelevantDatesObject(firstTime);
  let nextPeriodDate = increaseDateByPeriod(
    new Date(ensureMsTimestamp(firstTime)),
    time,
    timeStepType
  );

  timesArray.forEach((thisTime, index) => {
    const properTimestamp = ensureMsTimestamp(thisTime);
    const nextPeriodTimestamp = nextPeriodDate.getTime();

    if (properTimestamp >= nextPeriodTimestamp) {
      const xCoord = getXCoordByIndex(usableWidth, index, timesArray.length);
      let labelText: string;
      const relevantDatesObj = getRelevantDatesObject(thisTime);

      let doneLooping = false;
      timeTypes.forEach((type) => {
        if (
          !doneLooping &&
          relevantDatesObj[type] > lastRelevantDatesObj[type]
        ) {
          labelText = getLabelTextFromRelevantDates(relevantDatesObj, type);
          labelObjectsArray.push({
            labelText,
            xCoord,
          });
        }
        if (type === timeStepType) {
          // We don't care if periods smaller than the period type have increased. For instance, if our periodType is days, we don't care that minutes have increased, so we stop checking at type === periodType.
          doneLooping = true;
        }
      });

      lastRelevantDatesObj = { ...getRelevantDatesObject(properTimestamp) };
      nextPeriodDate = increaseDateByPeriod(
        new Date(properTimestamp),
        time,
        timeStepType
      );
    }
  });

  return labelObjectsArray;
};

export default makeTimeLabelObjectsArray;
