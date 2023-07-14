import LogoIcon from "@/components/icons/Logo";
import StyledHeader from "./StyledHeader";
import FunctionalIcon from "@/components/icons/FunctionalIcon/FunctionalIcon";
import SVG from "@/styles/extendableElements/SVG";
import LogoBox from "./LogoBox";

interface HeaderProps {}

const Header = ({}: HeaderProps): JSX.Element => {
  console.log("Header");
  return (
    <StyledHeader>
      <LogoBox />
    </StyledHeader>
  );
};

export default Header;
