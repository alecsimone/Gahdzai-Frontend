import { white } from '@/styles/constants/colors';
import { miniText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import ensureMsTimestamp from '@/utils/ensureMsTimestamp';

// * Formats and then adds the time and date strings to our values box
type Signature = (dataObj: {
  time: number;
  ctx: CanvasRenderingContext2D;
  weightedMiddle: number;
  lineHeight: number;
  originY: number;
}) => void;

const addTimeAndDateStrings: Signature = ({
  time,
  ctx,
  weightedMiddle,
  lineHeight,
  originY,
}) => {
  const timeAsDate = new Date(ensureMsTimestamp(time));
  const dateString = new Intl.DateTimeFormat('en-US').format(timeAsDate);
  const timeString = new Intl.DateTimeFormat('en-us', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(timeAsDate);

  // And now we can add the time and date strings centered in our box on lines 1 and 2
  ctx.textAlign = 'center';
  ctx.fillStyle = setAlpha(white, 0.6);
  ctx.font = `${miniText} sans-serif`;
  ctx.fillText(dateString, weightedMiddle, originY + lineHeight / 2);
  ctx.fillStyle = white;
  ctx.fillText(timeString, weightedMiddle, originY + lineHeight * 1.5);
};

export default addTimeAndDateStrings;
