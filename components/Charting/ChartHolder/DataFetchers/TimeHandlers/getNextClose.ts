// * Gets the timestamp (in seconds) of the next market close. This does not need to be very precise, we basically just need to get a date in the future and then our query will return the most recent data.
type Signature = () => number;

const getNextClose: Signature = () => {
  const endDate = new Date();
  endDate.setUTCHours(22, 0, 0, 0); // The market closes at 8PM UTC time, which would be 21 hours, but I'm adding one for safety. We don't need to handle weekends because this is the end date, and they'll just give us the last data there was before it

  const nextClose = Math.floor(endDate.getTime() / 1000);
  return nextClose;
};

export default getNextClose;
