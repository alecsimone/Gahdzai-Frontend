import marketHolidays from '@/utils/marketHolidays';

// * For a daily period query, we need to get the "previous close" value we'll use to base our relative changes off of. This needs to be the end of the day BEFORE the current / most recent trading day. It also needs to avoid any market holidays. So on a Sunday, it needs to be Thursday's close. On a Tuesday after a Monday holiday, it needs to be Friday's close.

type Signature = (startDate: Date) => Date;

const isWeekend = (day: Date): boolean => {
  const dayOfWeek = day.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const isMarketHoliday = (day: Date): boolean =>
  marketHolidays.some(
    (holiday) => holiday.toDateString() === day.toDateString()
  );

const getPreviousClose: Signature = (startDate) => {
  let tradingDaysFound = 0;
  if (!isWeekend(startDate) && !isMarketHoliday(startDate)) {
    tradingDaysFound += 1;
  }
  const nextDate = startDate;
  for (let i = 0; i < 7 && tradingDaysFound < 2; i += 1) {
    nextDate.setDate(nextDate.getDate() - 1);
    if (!isWeekend(nextDate) && !isMarketHoliday(nextDate)) {
      tradingDaysFound += 1;
    }
  }

  return nextDate;
};

export default getPreviousClose;
