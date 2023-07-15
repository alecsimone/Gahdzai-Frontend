import StyledHeader from "./StyledHeader";
import LogoBox from "./LogoBox";
import MemberBox from "./MemberBox/MemberBox";

interface HeaderProps {}

const Header = ({}: HeaderProps): JSX.Element => {
  return (
    <StyledHeader>
      <LogoBox />
      <MemberBox />
    </StyledHeader>
  );
};

export default Header;
