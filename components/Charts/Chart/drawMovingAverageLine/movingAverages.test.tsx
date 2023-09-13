import { getCandleValue } from './convertCandlesToPoints';
import convertDataPointsToSMAPoints from './convertDataPointsToSMAPoints';
import convertToXYPairs from './convertToXYPairs';
import {
  makeDataPointsArrayOfLength,
  mockChartData,
} from './mockMovingAverageData';

describe('Converts candleData to simple values', () => {
  it('Works for basic values', () => {
    const candleData = {
      high: '10',
      low: '0',
      open: '8',
      close: '2',
      time: '0',
    };
    const overallMid = getCandleValue(candleData);
    expect(overallMid).toBe(5);
  });

  it('Works with decimal values', () => {
    const candleData = {
      high: '0.8',
      low: '0.4',
      open: '2.4',
      close: '2.8',
      time: '100',
    };
    const overallMid = getCandleValue(candleData);
    expect(overallMid).toBe(1.6);
  });
});

describe('Create average time/value pairs', () => {
  it('Has the right number of pairs', () => {
    const mockDataPoints10 = makeDataPointsArrayOfLength(10);
    const mockSMAPoints10 = convertDataPointsToSMAPoints(mockDataPoints10);

    expect(mockSMAPoints10).toHaveLength(0);

    const mockDataPoints20 = makeDataPointsArrayOfLength(20);
    const mockSMAPoints20 = convertDataPointsToSMAPoints(mockDataPoints20);

    expect(mockSMAPoints20).toHaveLength(20);

    const mockDataPoints50 = makeDataPointsArrayOfLength(50);
    const mockSMAPoints50 = convertDataPointsToSMAPoints(mockDataPoints50);

    expect(mockSMAPoints50).toHaveLength(50);

    const mockDataPoints250 = makeDataPointsArrayOfLength(250);
    const mockSMAPoints250 = convertDataPointsToSMAPoints(mockDataPoints250);

    expect(mockSMAPoints250).toHaveLength(250);

    const mockDataPoints500 = makeDataPointsArrayOfLength(500);
    const mockSMAPoints500 = convertDataPointsToSMAPoints(mockDataPoints500);

    expect(mockSMAPoints500).toHaveLength(500);

    const mockDataPoints1500 = makeDataPointsArrayOfLength(1500);
    const mockSMAPoints1500 = convertDataPointsToSMAPoints(mockDataPoints1500);

    expect(mockSMAPoints1500).toHaveLength(1500);
  });

  it('calculates the average correctly', () => {
    const mockDataPoints20 = makeDataPointsArrayOfLength(20);
    const mockSMAPoints20 = convertDataPointsToSMAPoints(mockDataPoints20);

    expect(mockSMAPoints20[0].value).toBe(1);
    expect(mockSMAPoints20[19].value).toBe(15.5);

    const mockDataPoints200 = makeDataPointsArrayOfLength(200);
    const mockSMAPoints200 = convertDataPointsToSMAPoints(mockDataPoints200);

    expect(mockSMAPoints200[0].value).toBe(1);
    expect(mockSMAPoints200[199].value).toBe(175.5);
  });
});

describe('Converts the time/value pairs to XY pairs', () => {
  it('Has the right number of pairs', () => {
    const mockDataPoints20 = makeDataPointsArrayOfLength(20);
    const mockSMAPoints20 = convertDataPointsToSMAPoints(mockDataPoints20);
    const mockXYPairs20 = convertToXYPairs(mockSMAPoints20, mockChartData);

    expect(mockXYPairs20).toHaveLength(20);
  });
});
