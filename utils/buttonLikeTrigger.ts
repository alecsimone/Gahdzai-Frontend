import { KeyboardEvent } from 'react';

const buttonLikeTrigger = (
  e: KeyboardEvent<any>,
  onTrigger: (e: KeyboardEvent<any>) => void
) => {
  if (e.key === 'Enter' || e.key === ' ') {
    onTrigger(e);
  }
};

export default buttonLikeTrigger;
