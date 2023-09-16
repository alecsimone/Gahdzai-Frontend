import { horizontalGutter } from '../constants';

const getUsableHeight = (height: number) => height - horizontalGutter;

export default getUsableHeight;
