// * Looks up the symbol of the heatmapItem and checks to see if we have an image for that symbol. If we do, it returns that image's url
type Signature = (symbol: string) => string;

const getHeatmapBackgroundImage: Signature = (symbol) => {
  let imageUrl = '';

  const upperCaseSymbol = symbol.toUpperCase();

  switch (upperCaseSymbol) {
    case 'RUT':
      imageUrl = 'mainStreet';
      break;
    case 'DJI':
      imageUrl = 'factory';
      break;
    case 'XLI':
      imageUrl = 'factory';
      break;
    case 'SPX':
      imageUrl = 'flag';
      break;
    case 'SPY':
      imageUrl = 'flag';
      break;
    case 'COMP':
      imageUrl = 'chip';
      break;
    case 'XLK':
      imageUrl = 'chip';
      break;
    case 'XLV':
      imageUrl = 'hospital';
      break;
    case 'XLY':
      imageUrl = 'mall';
      break;
    case 'XLB':
      imageUrl = 'mine';
      break;
    case 'XLE':
      imageUrl = 'oil';
      break;
    case 'XLP':
      imageUrl = 'grocery';
      break;
    case 'XLF':
      imageUrl = 'money';
      break;
    case 'XLC':
      imageUrl = 'network';
      break;
    case 'XLU':
      imageUrl = 'utilities';
      break;
    case 'XLRE':
      imageUrl = 'suburbia';
      break;
    default:
      imageUrl = '';
  }

  return `url('/heatmapBackgrounds/${imageUrl}.png')`;
};

export default getHeatmapBackgroundImage;
