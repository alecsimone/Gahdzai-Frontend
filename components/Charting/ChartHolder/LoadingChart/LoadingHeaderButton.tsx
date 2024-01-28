import { useEffect, useState } from 'react';

const LoadingHeaderButton = (): JSX.Element => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 6 ? '.' : `${prevDots}.`));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <h6 className="chartLabel loading">
      Loading
      {dots}
    </h6>
  );
};

export default LoadingHeaderButton;
