import styled from 'styled-components';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { deepBlack, gold } from '@/styles/constants/colors';
import { miniText, smallHead } from '@/styles/constants/fontSizes';

const StyledSignUp = styled.div`
  background: ${deepBlack};
  width: 100rem;
  max-width: 90%;
  button.resetPassword,
  button.back {
    display: block;
    margin: auto;
    border: none;
    color: ${setAlpha(gold, 0.6)};
    &:hover {
      background: none;
      text-decoration: underline;
    }
  }
  .cookieWarning {
    font-size: ${miniText};
  }
  .success {
    text-align: center;
    font-size: ${smallHead};
    color: ${gold};
    font-weight: bold;
  }
`;

export default StyledSignUp;
