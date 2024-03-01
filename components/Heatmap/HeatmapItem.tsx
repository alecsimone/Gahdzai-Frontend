import makeNumberReadable from '@/utils/makeNumberReadable';
import type { HeatmapData } from './types';
import getHeatmapBackgroundImage from './getHeatmapBackgroundImage';

interface HeatmapItemProps {
  heatmapData: HeatmapData;
  scoreColor: string;
  symbolColor: string;
  itemSize: 'small' | 'medium' | 'large';
}

const HeatmapItem = ({
  heatmapData: { symbol, currentValue, rawChange, changeScore },
  scoreColor,
  symbolColor,
  itemSize,
}: HeatmapItemProps): React.ReactNode => {
  const isPositive = rawChange > 0;

  const rawChangeString = `(${isPositive ? '+' : ''}${rawChange})`;

  const currentValueEl = (
    <div className="currentValue">
      <span className="rawValue">
        {makeNumberReadable({ number: currentValue })}
      </span>
      <span className="rawChange">{rawChangeString}</span>
    </div>
  );

  // TODO replace % with σ once we start computing z-scores
  const changeScoreString = `${isPositive ? '+' : ''}${changeScore}%`;

  const backgroundImage = getHeatmapBackgroundImage(symbol);

  return (
    <article
      className={`heatmapItem ${itemSize}`}
      key={symbol}
      style={{
        backgroundImage,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className="outerWrapper" style={{ background: scoreColor }}>
        <div className="innerWrapper">
          <h3 className="symbol" style={{ color: symbolColor }}>
            {symbol}
          </h3>
          {currentValueEl}
          <div
            className={`changeScore${isPositive ? ' isPositive' : ''}${
              rawChange < 0 ? ' isNegative' : ''
            }`}
          >
            {changeScoreString}
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeatmapItem;
