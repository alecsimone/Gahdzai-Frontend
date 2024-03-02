import { type Get_Candles_For_Symbols_QueryQuery } from '@/__generated__/graphql';
import makeSafeDecimals from '@/utils/makeSafeDecimals';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import StyledHeatmap from './StyledHeatmap';
import cookHeatmapData from './cookHeatmapData';
import HeatmapItem from './HeatmapItem';
import { downColor, upColor } from '../Charting/Charts/constants';
import getLineColor from '../Charting/Charts/ChartMakers/PercentageChange/getLineColor';
import useHeatmapGridSizer from './useHeatmapGridSizer';

// * Creates a heatmap out of a provided array of CandleSets.
interface HeatmapProps {
  rawData: Get_Candles_For_Symbols_QueryQuery;
  isDailyPeriod: boolean;
}

const Heatmap = ({ rawData, isDailyPeriod }: HeatmapProps): React.ReactNode => {
  // const heatmapData = cookHeatmapData(rawData, isDailyPeriod);
  // TODO Once we switch to paid polygon data, we'll get multiple candles and will want to do this check for if we're on a daily period. For now though, we always have to pretend we're not
  const heatmapData = cookHeatmapData(rawData, false);
  heatmapData.sort((a, b) => {
    if (b.changeScore !== a.changeScore) {
      return b.changeScore - a.changeScore;
    }
    return b.rawChange - a.rawChange;
  });

  // We want to make sure that for any given list of symbols, there's a stable order of that list so that we can assign them a stable color. So this alphabetized symbols array will serve as that list with a stable order
  const symbols = heatmapData.map((item) => item.symbol);
  symbols.sort();

  const gridRef = useHeatmapGridSizer(heatmapData.length);

  let maxScore: number = 0;
  const firstScore = Math.abs(heatmapData[0]!.changeScore);
  const lastScore = Math.abs(heatmapData.at(-1)!.changeScore);
  if (firstScore > maxScore) {
    maxScore = firstScore;
  }
  if (lastScore > maxScore) {
    maxScore = lastScore;
  }

  const heatmapItems = heatmapData.map((itemData) => {
    const color = itemData.changeScore > 0 ? upColor : downColor;

    const scoreHeatRaw = makeSafeDecimals(
      Math.abs(itemData.changeScore) / maxScore
    );
    const scoreHeat = 0.1 + 0.4 * scoreHeatRaw;

    const adjustedColor = setAlpha(color, scoreHeat);

    const stableIndex = symbols.indexOf(itemData.symbol);
    const symbolColor = getLineColor({
      symbol: itemData.symbol,
      lineIndex: stableIndex,
    });
    const adjustedSymbolColor = setAlpha(symbolColor, 0.8);

    let itemSize: 'large' | 'medium' | 'small' = 'large';
    if (heatmapData.length > 5) {
      itemSize = 'medium';
    }
    if (heatmapData.length > 10) {
      itemSize = 'small';
    }

    return (
      <HeatmapItem
        heatmapData={itemData}
        scoreColor={adjustedColor}
        symbolColor={adjustedSymbolColor}
        itemSize={itemSize}
      />
    );
  });
  return <StyledHeatmap ref={gridRef}>{heatmapItems}</StyledHeatmap>;
};

export default Heatmap;
