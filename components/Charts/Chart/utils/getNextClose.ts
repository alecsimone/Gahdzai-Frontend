const getNextClose = (): number => {
  const endDate = new Date();
  endDate.setUTCHours(21, 0, 0, 0); // The market closes at 8PM UTC time, which would be 20 hours, but I'm adding one for safety. We don't need to handle weekends because this is the end date, and they'll just give us the last data there was before it

  const nextClose = Math.floor(endDate.getTime() / 1000);
  return nextClose;
};

export default getNextClose;
