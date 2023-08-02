import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import Input from '@/styles/extendableElements/Input';
import Error from '@/components/Foundation/Error';

interface FormFieldInterface {
  type: 'text' | 'email' | 'password' | 'url';
  id?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

interface FormFieldProps {
  fieldType: 'input';
  requirements?: string;
  fieldProps: FormFieldInterface;
}

const FormField = ({
  fieldType,
  requirements,
  fieldProps,
}: FormFieldProps): JSX.Element => {
  let formElement;

  const fieldRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (fieldRef.current == null) return;
    if (fieldProps.value && !fieldRef.current.checkValidity()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [fieldProps.value]);

  if (fieldType === 'input') {
    formElement = (
      <Input
        ref={fieldRef}
        title={requirements}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
      />
    );
  } else {
    return <Error error="Unknown field type" />;
  }

  return (
    <div className="inputWrapper">
      {requirements != null && !isValid && (
        <div className="requirements">{requirements}</div>
      )}
      {formElement}
    </div>
  );
};

// FormField.defaultProps = {
//   requirements: ''
// };

export default FormField;
