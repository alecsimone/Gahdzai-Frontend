import { useQuery } from '@apollo/client';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';

const resolution = 1;

const useChartHolder = () => {
  // TODO Handle holidays
  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 1) {
    // Sunday or Monday
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 3); // We want Thursday's close, or Friday's close for Monday, but either way it's 3 days back
  } else if (dayOfWeek === 6) {
    // Saturday
    const currentDate = startDate.getDate();
    startDate.setDate(currentDate - 2); // Again, Thursday's close will be 2 days back
  }

  startDate.setUTCHours(18, 60 - resolution, 0, 0); // We want ${resolution} minutes before market close, which is 8PM UTC time, so 19:57 (assuming resolution === 3), but the hours parameter is 0-indexed, so it needs to be 18.

  const previousClose = Math.floor(startDate.getTime() / 1000);

  const endDate = new Date();
  endDate.setUTCHours(20, 0, 0, 0); // As described above, this could be 19 for the hours parameter, but just for safety I'm making it 20. We don't need to worry about weekends, because we'll just get back data for the last active days

  const nextClose = Math.floor(endDate.getTime() / 1000);

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
  return { data, loading, error };
};

export default useChartHolder;
