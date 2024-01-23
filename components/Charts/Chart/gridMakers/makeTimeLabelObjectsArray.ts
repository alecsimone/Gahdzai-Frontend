import { type DataPoint, type PeriodTypes, periodTypes } from '../types';
import ensureMsTimestamp from '../utils/ensureMsTimestamp';
import getXValueByIndex from '../utils/getXValueByIndex';
import getFirstTimeLabelText from './getFirstTimeLabelText';
import getLabelTextFromRelevantDates from './getLabelTextFromRelevantDates';
import getRelevantDatesObject from './getRelevantDatesObject';
import increaseDateByPeriod from './increaseDateByPeriod';

// * Turns datapoints into an array of the labelObjects we need to make the vertical grid lines of the periods of that data
type Signature = (obj: {
  datapoints: DataPoint[];
  period: number;
  periodType: PeriodTypes;
  usableWidth: number;
}) => LabelObject[];

interface LabelObject {
  labelText: string;
  xCoord: number;
}

const makeTimeLabelObjectsArray: Signature = ({
  datapoints,
  period,
  periodType,
  usableWidth,
}) => {
  const firstTimeLabel = datapoints[0]!;
  const labelObjectsArray: LabelObject[] = [
    {
      labelText: getFirstTimeLabelText(firstTimeLabel.time, periodType),
      xCoord: getXValueByIndex(usableWidth, 0, datapoints.length),
    },
  ];

  let lastRelevantDatesObj = getRelevantDatesObject(firstTimeLabel.time);
  let nextPeriodDate = increaseDateByPeriod(
    new Date(ensureMsTimestamp(firstTimeLabel.time)),
    period,
    periodType
  );

  datapoints.forEach((dataPoint, index) => {
    const { time } = dataPoint;
    const properTimestamp = ensureMsTimestamp(time);
    const nextPeriodTimestamp = nextPeriodDate.getTime();

    if (properTimestamp >= nextPeriodTimestamp) {
      const xCoord = getXValueByIndex(usableWidth, index, datapoints.length);
      let labelText: string;
      const relevantDatesObj = getRelevantDatesObject(time);

      let doneLooping = false;
      periodTypes.forEach((type) => {
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
        if (type === periodType) {
          // We don't care if periods smaller than the period type have increased. For instance, if our periodType is days, we don't care that minutes have increased, so we stop checking at type === periodType.
          doneLooping = true;
        }
      });

      lastRelevantDatesObj = { ...getRelevantDatesObject(properTimestamp) };
      nextPeriodDate = increaseDateByPeriod(
        new Date(properTimestamp),
        period,
        periodType
      );
    }
  });

  return labelObjectsArray;
};

export default makeTimeLabelObjectsArray;
