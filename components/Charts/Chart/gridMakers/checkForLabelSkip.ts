import { type LabelSkipCheckInterface } from '../types';
import compareLabelPositions from './compareLabelPositions';

// * Checks the given entry on our list of labels to see if we should skip it because it will overlap with a more important label
// - Currently, the only times it should do that are with the first and last labels, because they might overlap with the labels for the min and max values, so we're just checking those
type Signature = (dataObj: LabelSkipCheckInterface) => boolean;
const checkForLabelSkip: Signature = (dataObj) => {
  const { i, labelsList } = dataObj;

  let shouldSkipLabel = false;

  if (i === 1) {
    shouldSkipLabel = compareLabelPositions(dataObj, 'before');
    return shouldSkipLabel;
  }
  if (i === labelsList.length - 2) {
    shouldSkipLabel = compareLabelPositions(dataObj, 'after');
    return shouldSkipLabel;
  }
  return shouldSkipLabel;
};

export default checkForLabelSkip;
