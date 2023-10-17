import getPreviousClose from './getPreviousClose';

describe('getPreviousClose', () => {
  it('Works with regular weekdays', () => {
    const thursday = new Date(2023, 9, 19, 12);
    const previousClose = getPreviousClose(thursday);
    expect(previousClose.getDay()).toBe(3); // 3 === Wednesday
  });

  it('Works for regular Mondays', () => {
    const monday = new Date(2023, 9, 16, 12);
    const previousClose = getPreviousClose(monday);
    expect(previousClose.getDay()).toBe(5); // 5 === Friday
  });

  it('Works for regular Sundays', () => {
    const sunday = new Date(2023, 9, 15, 12);
    const previousClose = getPreviousClose(sunday);
    expect(previousClose.getDay()).toBe(4); // 4 === Thursday
  });

  it('Works for regular Saturdays', () => {
    const saturday = new Date(2023, 9, 14, 12);
    const previousClose = getPreviousClose(saturday);
    expect(previousClose.getDay()).toBe(4); // 4 === Thursday
  });

  it('Works for a Monday holiday', () => {
    const monday = new Date(2024, 0, 15, 12);
    const previousClose = getPreviousClose(monday);
    expect(previousClose.getDay()).toBe(4); // 4 === Thursday
  });

  it('Works for the Tuesday after a Monday holiday', () => {
    const tuesday = new Date(2024, 0, 16, 12);
    const previousClose = getPreviousClose(tuesday);
    expect(previousClose.getDay()).toBe(5); // 5 === Friday
  });

  it('Works for the day of a mid-week holiday', () => {
    const wednesday = new Date(2024, 5, 19, 12);
    const previousClose = getPreviousClose(wednesday);
    expect(previousClose.getDay()).toBe(1); // 1 === Monday
  });

  it('Works for the day after a mid-week holiday', () => {
    const thursday = new Date(2024, 5, 20, 12);
    const previousClose = getPreviousClose(thursday);
    expect(previousClose.getDay()).toBe(2); // 2 === Tuesday
  });
});
