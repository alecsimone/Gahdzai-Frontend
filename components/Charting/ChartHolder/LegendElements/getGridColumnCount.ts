const getGridColumnCount = (
  containerWidth: number,
  itemCount: number,
  itemMinimumSize: number
) => {
  const maximumColumns = Math.floor(containerWidth / itemMinimumSize);
  const targetItemsPerColumn = Math.ceil(itemCount / maximumColumns);
  const columnCount = Math.ceil(itemCount / targetItemsPerColumn);

  return columnCount;
};

export default getGridColumnCount;
