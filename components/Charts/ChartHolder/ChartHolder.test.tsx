// import '@testing-library/jest-dom';

import getPreviousClose from '../Chart/utils/getPreviousClose';

type Days = 'sunday' | 'monday' | 'saturday' | 'wednesday';

const timestamps: Record<Days, number> = {
  sunday: 1695599438897,
  monday: 1695685838897,
  saturday: 1695513038897,
  wednesday: 1695253838897,
} as const;

describe('getPreviousClose', () => {
  it('gets the right date no matter the day of the week', () => {
    const days: Days[] = Object.keys(timestamps) as Days[];
    days.forEach((day, index) => {
      const timestamp = timestamps[day];
      const date = new Date(timestamp);
      if (days[index] === 'sunday') {
        expect(date.getDay()).toBe(0);
        // If the current day is Sunday, then the previous close should be for Thursday
        const previousClose = getPreviousClose(date);
        const previousCloseDate = new Date(previousClose * 1000);
        expect(previousCloseDate.getDay()).toBe(4);
      } else if (days[index] === 'monday') {
        expect(date.getDay()).toBe(1);
        // If the current day is Monday, then the previous close should be for Friday
        const previousClose = getPreviousClose(date);
        const previousCloseDate = new Date(previousClose * 1000);
        expect(previousCloseDate.getDay()).toBe(5);
      } else if (days[index] === 'saturday') {
        expect(date.getDay()).toBe(6);
        // If the current day is Saturday, then the previous close should be for Thursday
        const previousClose = getPreviousClose(date);
        const previousCloseDate = new Date(previousClose * 1000);
        expect(previousCloseDate.getDay()).toBe(4);
      } else if (days[index] === 'wednesday') {
        expect(date.getDay()).toBe(3);
        // If the current day is Wednesday, then the previous close should be for Tuesday
        const previousClose = getPreviousClose(date);
        const previousCloseDate = new Date(previousClose * 1000);
        expect(previousCloseDate.getDay()).toBe(2);
      }
    });

    expect(true).toBe(true);
  });
});
