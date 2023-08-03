import { ReactNode } from 'react';
import StyledLayout from './StyledLayout';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode; // The page component for the currently active route
}

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <StyledLayout>
    <Header />
    <main className="pageComponent">{children}</main>
  </StyledLayout>
);

export default Layout;
