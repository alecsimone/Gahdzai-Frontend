import { MouseEvent, KeyboardEvent, ReactNode } from 'react';

import SVG from '@/styles/extendableElements/SVG';
import buttonLikeTrigger from '../../../utils/buttonLikeTrigger';

interface FunctionalIconProps {
  iconName: string; // Will be used for className and title text (unless titleTextReplacement provided)
  extraClass?: string; // Added to the className after the iconName
  titleTextReplacement?: string; // Replaces the iconName as the title text for the SVG
  onTrigger?: (
    e: MouseEvent<SVGSVGElement> | KeyboardEvent<SVGSVGElement>
  ) => any;
  children: ReactNode; // The actual icon you want to render
}

const FunctionalIcon = ({
  iconName,
  onTrigger,
  extraClass,
  titleTextReplacement,
  children,
}: FunctionalIconProps): JSX.Element => {
  const capitalizedName = `${iconName.charAt(0).toUpperCase()}${iconName.slice(
    1
  )}`;

  return (
    <SVG
      className={extraClass == null ? iconName : `${iconName} ${extraClass}`}
      viewBox="0 0 200 200"
      onClick={(e: MouseEvent<SVGSVGElement>) => {
        if (onTrigger != null) {
          onTrigger(e);
        }
      }}
      onKeyDown={(e: KeyboardEvent<SVGSVGElement>) => {
        if (onTrigger != null) {
          buttonLikeTrigger(e, onTrigger);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <title>
        {titleTextReplacement == null ? capitalizedName : titleTextReplacement}
      </title>
      {children}
    </SVG>
  );
};

export default FunctionalIcon;
