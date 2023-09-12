const getTimeString = (time: number) => {
  const thisDate = new Date(time * 1000);
  const thisHour = thisDate.getHours();
  const thisMinute = `${
    thisDate.getMinutes() < 10 ? '0' : ''
  }${thisDate.getMinutes()}`;
  return `${thisHour}:${thisMinute}`;
};

export default getTimeString;
