import styled from 'styled-components';
import { smallHead } from '@/styles/constants/fontSizes';
import { scroll } from '@/styles/theme';

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  header.mainHeader {
    height: ${smallHead};
  }
  .pageComponent {
    flex-grow: 1;
    ${scroll}
  }
`;

export default StyledLayout;
