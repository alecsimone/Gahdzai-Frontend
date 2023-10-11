import { RelevantDatesObjectInterface } from './getRelevantDatesObject';
import { PeriodTypes } from '../types';

// * Takes in a RelevantDatesObj and a PeriodType and gets the appropriate label text for that RelevantDatesObj after increasing by a PeriodType
// - So if the PeriodType is year, we get the labelText for starting a new year. If the PeriodType is day, we get the labelText for starting a new day.

type Signature = (
  relevantDatesObj: RelevantDatesObjectInterface,
  periodType: PeriodTypes
) => string;

const getLabelTextFromRelevantDates: Signature = (
  relevantDatesObj,
  periodType
) => {
  let labelText = '';
  if (periodType === 'year') {
    labelText = `${relevantDatesObj.year}`;
  } else if (periodType === 'month' || periodType === 'date') {
    labelText = `${relevantDatesObj.month + 1}/${relevantDatesObj.date}`;
  } else if (periodType === 'hour' || periodType === 'minute') {
    labelText = `${relevantDatesObj.hour}:${
      relevantDatesObj.minute < 10
        ? `0${relevantDatesObj.minute}`
        : relevantDatesObj.minute
    }`;
  }
  return labelText;
};

export default getLabelTextFromRelevantDates;
