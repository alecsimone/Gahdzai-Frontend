const makeRandomBoolean = (): boolean => {
  const randomNumber = Math.random();
  return randomNumber < 0.5;
};

export default makeRandomBoolean;
