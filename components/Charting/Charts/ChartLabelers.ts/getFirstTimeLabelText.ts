import getRelevantDatesObject from './getRelevantDatesObject';
import type { TimeTypes } from '../types';

// * Takes in a RelevantDatesObj and PeriodType and creates a full label for it. This label should include the date and time, as it is initiating the series of labels. If the PeriodType is in years, we should also include the year.
type Signature = (
  firstTime: number | string | Date,
  timeStepType: TimeTypes
) => string;

const getFirstTimeLabelText: Signature = (firstTime, timeStepType) => {
  const relevantDatesObj = getRelevantDatesObject(firstTime);

  let firstLabelText = '';
  if (timeStepType === 'year') {
    firstLabelText += `${relevantDatesObj.year} `;
  }
  firstLabelText += `${relevantDatesObj.month + 1}/${relevantDatesObj.day}`;

  return firstLabelText;
};

export default getFirstTimeLabelText;
