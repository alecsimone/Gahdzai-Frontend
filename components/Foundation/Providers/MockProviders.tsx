import { ReactNode } from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import GlobalStyle from '@/styles/globalStyle';

interface MockProvidersProps {
  children: ReactNode;
  mocks?: readonly MockedResponse<Record<string, any>>[] | undefined;
}

const MockProviders = ({
  children,
  mocks,
}: MockProvidersProps): JSX.Element => (
  <MockedProvider mocks={mocks}>
    <GlobalStyle />
    {children}
  </MockedProvider>
);

export default MockProviders;
