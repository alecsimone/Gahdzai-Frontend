// import '@testing-library/jest-dom';

import getGridColumnCount from './getGridColumnCount';

describe('getGridColumnCount', () => {
  it('Gets the right number of columns', () => {
    let containerWidth = 1200;
    let itemCount = 4;
    let itemMinimumSize = 150;
    let gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );
    expect(gridColumnCount).toBe(4);

    containerWidth = 600;
    itemCount = 4;
    itemMinimumSize = 200;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(2);

    containerWidth = 600;
    itemCount = 6;
    itemMinimumSize = 200;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(3);

    containerWidth = 600;
    itemCount = 6;
    itemMinimumSize = 300;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(2);

    containerWidth = 600;
    itemCount = 7;
    itemMinimumSize = 200;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(3);

    containerWidth = 600;
    itemCount = 7;
    itemMinimumSize = 150;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(4);

    containerWidth = 600;
    itemCount = 6;
    itemMinimumSize = 50;
    gridColumnCount = getGridColumnCount(
      containerWidth,
      itemCount,
      itemMinimumSize
    );

    expect(gridColumnCount).toBe(6);
  });
});
