import { useQuery } from '@apollo/client';
import { useState, ReactNode } from 'react';
import GET_INDEX_DATA_QUERY from '../Chart/getIndexCandlesQuery.gql';

const resolution = 1;

const useChartHolder = () => {
  const [legendElements, setLegendElements] = useState<ReactNode[]>([
    <h6 className="chartLabel">Loading...</h6>,
  ]);

  // TODO Handle holidays
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // We want to make sure UTC time doesn't spill over into the next day
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

  startDate.setUTCHours(19, 60 - resolution, 0, 0); // We want ${resolution} minutes before market close, which is 8PM UTC time, so 19:57 (assuming resolution === 3).

  const previousClose = Math.floor(startDate.getTime() / 1000);

  const endDate = new Date();
  endDate.setUTCHours(21, 0, 0, 0); // As described above, this could be 20 for the hours parameter, but just for safety I'm making it 21. We don't need to worry about weekends, because we'll just get back data for the last active days

  const nextClose = Math.floor(endDate.getTime() / 1000);

  const { data, loading, error } = useQuery(GET_INDEX_DATA_QUERY, {
    variables: {
      from: `${previousClose}`,
      to: `${nextClose}`,
      resolution: `${resolution}`,
    },
  });
  return { data, loading, error, legendElements, setLegendElements };
};

export default useChartHolder;
