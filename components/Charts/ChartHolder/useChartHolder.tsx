import { useQuery } from '@apollo/client';
import GET_INDEX_CANDLES_QUERY from '../Chart/getIndexCandlesQuery.gql';

const useChartHolder = () => {
  // TODO Handle weekends / holidays
  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  if (dayOfWeek === 0) {
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 2);
  } else if (dayOfWeek === 7) {
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 1);
  }
  startDate.setHours(0, 0, 0, 0);

  const lastMidnight = Math.floor(startDate.getTime() / 1000);

  const endDate = new Date();
  endDate.setHours(11, 59, 59, 0);

  const thisMidnight = Math.floor(endDate.getTime() / 1000);

  const { data, loading, error } = useQuery(GET_INDEX_CANDLES_QUERY, {
    variables: {
      from: `${lastMidnight}`,
      to: `${thisMidnight}`,
      resolution: '3',
    },
  });
  return { data, loading, error };
};

export default useChartHolder;
