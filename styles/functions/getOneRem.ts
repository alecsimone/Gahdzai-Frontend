const getOneRem = () => {
  if (typeof window !== 'undefined') {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  return 12;
};
export default getOneRem;
