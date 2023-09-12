import { LabelSkipCheckInterface } from '../types';
import checkForEndingLabelSkip from './checkForEndingLabelSkip';
import checkForStartingLabelSkip from './checkForStartingLabelSkip';

const checkForLabelSkip = (dataObj: LabelSkipCheckInterface) => {
  const { i, stepList } = dataObj;

  let shouldSkipLabel = false;

  if (i === 1) {
    shouldSkipLabel = checkForStartingLabelSkip(dataObj);
  }
  if (i === stepList.length - 2) {
    shouldSkipLabel = checkForEndingLabelSkip(dataObj);
  }

  return shouldSkipLabel;
};

export default checkForLabelSkip;
