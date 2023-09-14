import { render } from '@testing-library/react';
import { LabelSkipCheckInterface } from '../types';
import checkForStartingLabelSkip from './checkForStartingLabelSkip';

describe('gridMakers', () => {
  it('Skips the second axis label when it would overlap with the first', () => {
    const { getByTestId } = render(<canvas data-testid="canvas" />);

    const canvas = getByTestId('canvas');
    const ctx = canvas.getContext('2d');

    const mockData: LabelSkipCheckInterface = {
      i: 1,
      labelText: '8:00',
      thisLineCoord: 45,
      stepList: [1690983000, 1690984800, 1690988400],
      directionalChartData: {
        lineDirection: 'vertical',
        chartData: {
          ctx,
          usableHeight: 996,
          usableWidth: 590,
          chartBoundaries: {
            chartBottom: 191.8507,
            chartEnd: 1691006700,
            chartStart: 1690983000,
            chartTop: 195.18,
          },
        },
      },
    };

    expect(true).toBe(true);
    const shouldSkipLabel = checkForStartingLabelSkip(mockData);

    expect(shouldSkipLabel).toBe(true);
  });
});
