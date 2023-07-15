import FormField from './FormField';
import { BasicFieldProps } from './types';

const EmailField = ({ value, onChange }: BasicFieldProps): JSX.Element => (
  <FormField
    key="email"
    fieldType="input"
    requirements="Must be a valid email address"
    fieldProps={{
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      value,
      onChange,
      required: true,
    }}
  />
);

export default EmailField;
