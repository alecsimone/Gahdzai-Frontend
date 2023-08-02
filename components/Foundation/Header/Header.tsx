import StyledHeader from './StyledHeader';
import LogoBox from './LogoBox';
import MemberBox from './MemberBox/MemberBox';

// interface HeaderProps {}

const Header = (): JSX.Element => (
  <StyledHeader>
    <LogoBox />
    <MemberBox />
  </StyledHeader>
);

export default Header;
