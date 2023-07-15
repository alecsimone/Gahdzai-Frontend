import FormField from './FormField';
import { BasicFieldProps } from './types';

const PasswordField = ({ value, onChange }: BasicFieldProps): JSX.Element => (
  <FormField
    key="password"
    fieldType="input"
    requirements="Password must be at least 8 characters long"
    fieldProps={{
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      value,
      onChange,
      required: true,
      minLength: 8,
      pattern: '.{8,}',
    }}
  />
);

export default PasswordField;
