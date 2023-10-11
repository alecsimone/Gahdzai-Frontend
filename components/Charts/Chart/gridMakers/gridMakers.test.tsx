import getTimePeriod from './getTimePeriod';

const usableWidth = 2400;
const firstDate = new Date(2023, 9, 9, 7, 30, 0);
const firstPoint = { time: `${firstDate.getTime()}`, value: 0 };

describe('getTimePeriod', () => {
  it('gets the right period given a usableWidth and two dates within 100 minutes of each other', () => {
    const lastDate = new Date(2023, 9, 9, 9, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(5);
    expect(periodType).toBe('minute');
  });

  it('gets the right period given two dates within 2 hours of each other', () => {
    const lastDate = new Date(2023, 9, 9, 9, 30, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(10);
    expect(periodType).toBe('minute');
  });

  it('gets the right period given two dates at the beginning and end of a day', () => {
    const lastDate = new Date(2023, 9, 9, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(20);
    expect(periodType).toBe('minute');
  });

  it('gets the right period given two dates at the beginning of one day and the end of the next', () => {
    const lastDate = new Date(2023, 9, 10, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(1);
    expect(periodType).toBe('hour');
  });

  it('gets the right period given two dates at the beginning and end of a week', () => {
    const lastDate = new Date(2023, 9, 13, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(2);
    expect(periodType).toBe('hour');
  });

  it('gets the right period given two dates at the beginning of one week and the end of the next week', () => {
    const lastDate = new Date(2023, 9, 20, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(1);
    expect(periodType).toBe('date');
  });

  it('gets the right period given two dates a month apart', () => {
    const lastDate = new Date(2023, 10, 9, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(2);
    expect(periodType).toBe('date');
  });

  it('gets the right period given two dates a year apart', () => {
    const lastDate = new Date(2024, 9, 9, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(1);
    expect(periodType).toBe('month');
  });

  it('gets the right period given two dates 5 years apart', () => {
    const lastDate = new Date(2028, 9, 9, 14, 0, 0);
    const lastPoint = { time: `${lastDate.getTime()}`, value: 0 };

    const { period, periodType } = getTimePeriod(usableWidth, [
      firstPoint,
      lastPoint,
    ]);
    expect(period).toBe(3);
    expect(periodType).toBe('month');
  });
});
