import StyledHeader from "./StyledHeader";

interface HeaderProps {}

const Header = ({}: HeaderProps): JSX.Element => {
  console.log("Header");
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
