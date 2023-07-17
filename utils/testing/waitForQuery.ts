import { act } from '@testing-library/react';

const waitForQuery = async () => {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
};

export default waitForQuery;
