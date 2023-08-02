import styled from 'styled-components';
import { white } from '@/styles/constants/colors';
import { setAlpha } from '@/styles/functions/modifyColorFunctions';
import { desktopBreakpoint } from '@/styles/constants/breakpoints';

const StyledHeader = styled.header`
  border-bottom: 2px solid ${setAlpha(white, 0.1)};
  padding: 0.75rem;
  ${desktopBreakpoint} {
    padding: 0.75rem 2rem;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default StyledHeader;
