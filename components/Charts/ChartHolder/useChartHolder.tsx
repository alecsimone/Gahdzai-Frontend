import { useQuery } from '@apollo/client';
import GET_CANDLES_QUERY from '../Chart/getCandlesQuery.gql';

const useChartHolder = () => {
  const { data, loading, error } = useQuery(GET_CANDLES_QUERY, {
    variables: {
      symbol: 'AAPL',
      from: '2023-08-02',
      to: '2023-08-03',
      resolution: '5',
    },
  });
  return { data, loading, error };
};

export default useChartHolder;
