import { LabelSkipCheckInterface } from '../types';
import checkForEndingLabelSkip from './checkForEndingLabelSkip';
import checkForStartingLabelSkip from './checkForStartingLabelSkip';

const checkForLabelSkip = (dataObj: LabelSkipCheckInterface) => {
  const { i, labelsList } = dataObj;

  let shouldSkipLabel = false;
  return false; // We need to totally rethink this logic with the new horizontal axis labeling system

  if (i === 1) {
    shouldSkipLabel = checkForStartingLabelSkip(dataObj);
    return shouldSkipLabel;
  }
  if (i === labelsList.length - 2) {
    shouldSkipLabel = checkForEndingLabelSkip(dataObj);
    return shouldSkipLabel;
  }
  return shouldSkipLabel;
};

export default checkForLabelSkip;
