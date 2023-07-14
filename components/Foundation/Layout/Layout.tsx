import { ReactNode } from "react";
import StyledLayout from "./StyledLayout";
import Header from "../Header";

interface LayoutProps {
  children: ReactNode; // The page component for the currently active route
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  console.log("Layout");
  return (
    <StyledLayout>
      <Header />
      <div className="pageComponent">{children}</div>
    </StyledLayout>
  );
};

export default Layout;
