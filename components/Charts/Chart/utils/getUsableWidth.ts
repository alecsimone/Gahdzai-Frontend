import { verticalGutter } from '../constants';

const getUsableWidth = (width: number) => width - verticalGutter;

export default getUsableWidth;
