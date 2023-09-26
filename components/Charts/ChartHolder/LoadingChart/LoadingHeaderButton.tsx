// interface LoadingHeaderProps {}

import { useEffect, useState } from 'react';

const LoadingHeaderButton = (): JSX.Element => {
  const [dots, setDots] = useState('.'); // Initialize dots as an empty string

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the number of dots in the animation
      setDots((prevDots) => (prevDots.length === 6 ? '.' : `${prevDots}.`)); // Reset after 3 dots
    }, 600); // Update every 0.1 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Run the effect once when the component mounts

  return (
    <h6 className="chartLabel loading">
      Loading
      {dots}
    </h6>
  );
};

export default LoadingHeaderButton;
