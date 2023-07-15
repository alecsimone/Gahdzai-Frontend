import FunctionalIcon from "@/components/icons/FunctionalIcon/FunctionalIcon";
import StyledLogoBox from "./StyledLogoBox";
import LogoIcon from "@/components/icons/Logo";

interface LogoBoxProps {}

const LogoBox = ({}: LogoBoxProps): JSX.Element => {
  return (
    <StyledLogoBox>
      <FunctionalIcon iconName="logo" titleTextReplacement="Gahdzai">
        <LogoIcon />
      </FunctionalIcon>
      <h1>Gahdzai</h1>
    </StyledLogoBox>
  );
};

export default LogoBox;
