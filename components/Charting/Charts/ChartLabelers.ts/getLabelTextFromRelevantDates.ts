import type { RelevantDatesObjectInterface } from './getRelevantDatesObject';
import type { TimeTypes } from '../types';

// * Takes in a RelevantDatesObj and a PeriodType and gets the appropriate label text for that RelevantDatesObj after increasing by a PeriodType
// - So if the PeriodType is year, we get the labelText for starting a new year. If the PeriodType is day, we get the labelText for starting a new day.

type Signature = (
  relevantDatesObj: RelevantDatesObjectInterface,
  timeStepType: TimeTypes
) => string;

const getLabelTextFromRelevantDates: Signature = (
  relevantDatesObj,
  timeStepType
) => {
  let labelText = '';
  if (timeStepType === 'year') {
    labelText = `${relevantDatesObj.year}`;
  } else if (timeStepType === 'month' || timeStepType === 'day') {
    labelText = `${relevantDatesObj.month + 1}/${relevantDatesObj.day}`;
  } else if (timeStepType === 'hour' || timeStepType === 'minute') {
    labelText = `${relevantDatesObj.hour}:${
      relevantDatesObj.minute < 10
        ? `0${relevantDatesObj.minute}`
        : relevantDatesObj.minute
    }`;
  }
  return labelText;
};

export default getLabelTextFromRelevantDates;
