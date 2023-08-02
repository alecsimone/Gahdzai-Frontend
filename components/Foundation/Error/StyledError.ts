import styled from 'styled-components';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { lightBlack, red } from '@/styles/constants/colors';
import { smallHead, smallText } from '@/styles/constants/fontSizes';

const StyledError = styled.div`
  border: 2px solid ${setAlpha(red, 0.5)};
  border-radius: 0.5rem;
  background: ${setAlpha(lightBlack, 0.75)};
  padding: 3rem 5rem;
  text-align: center;
  h4 {
    display: block;
    margin: 0 0 2rem 0;
    color: ${setAlpha(red, 0.75)};
    font-size: ${smallHead};
  }
  .message {
    font-size: ${smallText};
  }
`;

export default StyledError;
