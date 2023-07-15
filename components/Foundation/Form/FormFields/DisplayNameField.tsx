import FormField from './FormField';
import { BasicFieldProps } from './types';

const DisplayNameField = ({
  value,
  onChange,
}: BasicFieldProps): JSX.Element => (
  <FormField
    key="displayName"
    fieldType="input"
    requirements="Display Name must be at least 3 characters long"
    fieldProps={{
      type: 'text',
      required: true,
      name: 'displayName',
      placeholder: 'Display Name',
      minLength: 3,
      maxLength: 24,
      value,
      onChange,
      pattern: '.{3,24}',
    }}
  />
);

export default DisplayNameField;
