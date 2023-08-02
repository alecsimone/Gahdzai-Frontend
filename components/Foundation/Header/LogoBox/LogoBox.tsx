import FunctionalIcon from '@/components/icons/FunctionalIcon/FunctionalIcon';
import LogoIcon from '@/components/icons/Logo';
import StyledLogoBox from './StyledLogoBox';

// interface LogoBoxProps {}

const LogoBox = (): JSX.Element => (
  <StyledLogoBox>
    <FunctionalIcon iconName="logo" titleTextReplacement="Gahdzai">
      <LogoIcon />
    </FunctionalIcon>
    <h1>Gahdzai</h1>
  </StyledLogoBox>
);

export default LogoBox;
