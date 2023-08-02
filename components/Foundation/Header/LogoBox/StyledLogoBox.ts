import styled from 'styled-components';
import { gold } from '@/styles/constants/colors';
import { bigText, smallText } from '@/styles/constants/fontSizes';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';

const StyledLogoBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: ${bigText};
    margin-bottom: 3px;
  }
  h1 {
    display: none;
    @media screen and (min-width: 1100px) {
      display: block;
      margin-left: 0.75rem;
      color: ${setAlpha(gold, 0.9)};
      font-weight: 500;
      font-size: ${smallText};
    }
  }
`;

export default StyledLogoBox;
