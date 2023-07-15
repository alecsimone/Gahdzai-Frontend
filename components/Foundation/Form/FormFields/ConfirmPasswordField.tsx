import FormField from './FormField';
import { BasicFieldProps } from './types';

interface ConfirmPasswordProps extends BasicFieldProps {
  firstPasswordEntry: string;
}

const ConfirmPasswordField = ({
  value,
  onChange,
  firstPasswordEntry,
}: ConfirmPasswordProps): JSX.Element => (
  <FormField
    key="confirmPassword"
    fieldType="input"
    requirements="Passwords must match"
    fieldProps={{
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      value,
      onChange,
      required: true,
      pattern: firstPasswordEntry,
    }}
  />
);

export default ConfirmPasswordField;
