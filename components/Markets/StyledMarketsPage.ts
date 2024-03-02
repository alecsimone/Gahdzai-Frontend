import styled from 'styled-components';
import { deepBlack } from '@/styles/constants/colors';

const StyledMarketsPage = styled.section`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 4rem;
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  background: ${deepBlack};
`;

export default StyledMarketsPage;
