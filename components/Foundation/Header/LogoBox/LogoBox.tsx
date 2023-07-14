import FunctionalIcon from "@/components/icons/FunctionalIcon/FunctionalIcon";
import StyledLogoBox from "./StyledLogoBox";
import LogoIcon from "@/components/icons/Logo";

interface LogoBoxProps {}

const LogoBox = ({}: LogoBoxProps): JSX.Element => {
  console.log("LogoBox");
  return (
    <StyledLogoBox>
      <FunctionalIcon iconName="logo" titleTextReplacement="Gahdzai">
        <LogoIcon />
      </FunctionalIcon>
    </StyledLogoBox>
  );
};

export default LogoBox;
