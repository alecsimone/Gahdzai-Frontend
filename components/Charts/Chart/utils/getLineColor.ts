/* eslint-disable prefer-destructuring */

const colors = [
  'hsl(210, 100%, 60%)', // Blue
  'hsl(270, 100%, 60%)', // Purple
  'hsl(30, 100%, 60%)', // Orange
  'hsl(0, 0%, 90%)', // White
  'hsl(120, 80%, 60%)', // Green
  'hsl(180, 100%, 60%)', // Teal
  'hsl(0, 80%, 40%)', // Red
];

const getLineColor = (symbol: string, index: number) => {
  let computedColor: string;
  switch (symbol) {
    case 'SPX':
      computedColor = colors[0];
      break;
    case 'DJI':
      computedColor = colors[4];
      break;
    case 'COMP':
      computedColor = colors[1];
      break;
    case 'RUT':
      computedColor = colors[2];
      break;
    default:
      computedColor = colors[index];
  }

  return computedColor;
};

export default getLineColor;
