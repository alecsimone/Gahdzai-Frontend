/* eslint-disable prefer-destructuring */

// * Takes in either the symbol being charted or an index number for the current chart and figures out the correct color with which to draw that chart
type Signature = (datObj: { symbol?: string; index: number }) => string;

const colors = [
  'hsl(210, 100%, 50%)', // Blue
  'hsl(270, 100%, 60%)', // Purple
  'hsl(20, 100%, 60%)', // Orange
  'hsl(0, 0%, 90%)', // White
  'hsl(120, 80%, 60%)', // Green
  'hsl(180, 100%, 60%)', // Teal
  'hsl(0, 80%, 40%)', // Red
  'hsl(50, 100%, 70%)', // Gold
];

const getLineColor: Signature = ({ symbol, index }) => {
  let computedColor: string;
  if (symbol != null) {
    switch (symbol) {
      case 'SPX':
        computedColor = colors[0]!;
        break;
      case 'DJI':
        computedColor = colors[7]!;
        break;
      case 'COMP':
        computedColor = colors[1]!;
        break;
      case 'RUT':
        computedColor = colors[2]!;
        break;
      default:
        computedColor = colors[index]!;
    }
  } else {
    computedColor = colors[index]!;
  }

  return computedColor;
};

export default getLineColor;
