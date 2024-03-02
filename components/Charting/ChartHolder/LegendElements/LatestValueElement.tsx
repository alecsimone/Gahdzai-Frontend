import makeNumberReadable from '@/utils/makeNumberReadable';

interface LatestValueElementProps {
  latestValue: number;
}

const LatestValueElement = ({
  latestValue,
}: LatestValueElementProps): JSX.Element => {
  const latestValueString = `${makeNumberReadable(latestValue)}`;
  return <span key="latestValue">{latestValueString}</span>;
};

export default LatestValueElement;
