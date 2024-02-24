import type { Dispatch, SetStateAction } from 'react';
import Button from '@/styles/extendableElements/Button';

// * Toggles the displayed chart between historical and heatmap modes
interface HeatmapTogglerProps {
  showAsHeatmap: boolean;
  setShowAsHeatmap: Dispatch<SetStateAction<boolean>>;
}

const HeatmapToggler = ({
  showAsHeatmap,
  setShowAsHeatmap,
}: HeatmapTogglerProps): React.ReactNode => {
  const buttonText = showAsHeatmap ? 'View Chart' : 'View Heatmap';

  const clickHandler = () => {
    setShowAsHeatmap((prev) => !prev);
  };

  return (
    <Button className="heatmapToggler" type="button" onClick={clickHandler}>
      {buttonText}
    </Button>
  );
};

export default HeatmapToggler;
