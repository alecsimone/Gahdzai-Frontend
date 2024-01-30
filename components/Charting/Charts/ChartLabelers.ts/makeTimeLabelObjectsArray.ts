import ensureMsTimestamp from '@/utils/ensureMsTimestamp';
import { type TimeTypes, timeTypes } from '../types';
import getXCoordByIndex from '../DataPlotters/getXCoordByIndex';
import getFirstTimeLabelText from './getFirstTimeLabelText';
import getLabelTextFromRelevantDates from './getLabelTextFromRelevantDates';
import getRelevantDatesObject from './getRelevantDatesObject';
import increaseDateByTimeStep from './increaseDateByTimeStep';

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
  isNewTimeStepType: boolean;
}

const makeTimeLabelObjectsArray: Signature = ({
  timesArray,
  time,
  timeStepType,
  usableWidth,
}) => {
  // We start by making a labelObject from the first time in our timesArray
  const firstTime = timesArray[0]!;
  const labelObjectsArray: LabelObject[] = [
    {
      labelText: getFirstTimeLabelText(firstTime, timeStepType),
      xCoord: getXCoordByIndex(usableWidth, 0, timesArray.length),
      isNewTimeStepType: true,
    },
  ];

  // Then we make a variable to hold the previous relevant dates object so we can compare each one to the one before it
  let previousRelevantDatesObj = getRelevantDatesObject(firstTime);
  let nextTimeStepDate = increaseDateByTimeStep(
    new Date(ensureMsTimestamp(firstTime)),
    time,
    timeStepType
  );

  // Now we're going to loop over our times array to see when we hit a time that is more than one timeStep past the previous recorded timeStep
  let lastTimeStepTypeIndex: number = 0;
  const daysTimeStepTypeIndex = timeTypes.indexOf('day');
  timesArray.forEach((thisTime, index) => {
    // We start by getting a timestamp for the current time in our loop as well as the timestamp for the start of the next timeStep
    const thisTimestamp = ensureMsTimestamp(thisTime);
    const nextTimeStepTimestamp = nextTimeStepDate.getTime();

    // If we've reached a time that is later than the next timeStep, we want to create a label object for it
    if (thisTimestamp >= nextTimeStepTimestamp) {
      const xCoord = getXCoordByIndex(usableWidth, index, timesArray.length);
      let labelText: string;
      const relevantDatesObj = getRelevantDatesObject(thisTime);

      // We want this label to represent the highest level timeType which is different from the previous label. So we'll go through our timeTypes and check if any of them have changed
      let doneLooping = false;
      timeTypes.forEach((type, timeTypeIndex) => {
        if (
          !doneLooping &&
          relevantDatesObj[type] > previousRelevantDatesObj[type]
        ) {
          labelText = getLabelTextFromRelevantDates(relevantDatesObj, type);

          labelObjectsArray.push({
            labelText,
            xCoord,
            isNewTimeStepType:
              timeTypeIndex < lastTimeStepTypeIndex &&
              timeTypeIndex <= daysTimeStepTypeIndex,
          });
          lastTimeStepTypeIndex = timeTypeIndex;
        }
        if (type === timeStepType) {
          // We don't care if periods smaller than the period type have increased. For instance, if our periodType is days, we don't care that minutes have increased, so we stop checking at type === periodType.
          doneLooping = true;
        }
      });

      // Now we want to store this timestamp as the previousRelevantDatesObj and tick our nextTimeStepDate to the next timeStep
      previousRelevantDatesObj = { ...getRelevantDatesObject(thisTimestamp) };
      nextTimeStepDate = increaseDateByTimeStep(
        new Date(thisTimestamp),
        time,
        timeStepType
      );
    }
  });

  return labelObjectsArray;
};

export default makeTimeLabelObjectsArray;
