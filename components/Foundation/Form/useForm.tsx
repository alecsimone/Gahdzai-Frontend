import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { ApolloError } from '@apollo/client';
import StyledForm from '@/styles/extendableElements/Form';
import Button from '@/styles/extendableElements/Button';
import Error from '../Error';
import useFormInterface, { ManualUpdateObj } from './types';

const useForm: useFormInterface = (
  initialState,
  submitMutation,
  errorTranslator,
  submitButtonText,
  cancelFunction,
  customValidityCheck
) => {
  // First let's handle the basic form state and our updater.
  const [formState, setFormState] = useState(initialState);
  const handleFormUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormState((prev) => ({
        ...prev,
        [e.target.name]: e.target.files,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const manualFormUpdate = (updateObj: ManualUpdateObj) => {
    setFormState((prev) => ({
      ...prev,
      [updateObj.name]: updateObj.newValue,
    }));
  };

  // Then we'll handle checking the validity. This state will be passed to the submit button and will disable it if all the inputs aren't valid
  const [allInputsValid, setAllInputsValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formRef.current == null) return;

    // We start by getting all the inputs in the form
    const inputs = formRef.current.querySelectorAll('input');

    // Then we check each to make sure it's valid
    let inputValidityCheck = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        inputValidityCheck = false;
      }
    });

    if (inputValidityCheck && customValidityCheck) {
      inputValidityCheck = customValidityCheck(formState);
    }

    // And set our validity state accordingly
    setAllInputsValid(inputValidityCheck);
  }, [formState, customValidityCheck]);

  // Next we have an error state, which will be passed to the form to let the user know if there's an error submitting it
  const [error, setError] = useState<ApolloError | { message: string } | null>(
    null
  );

  // Finally our submit function.
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!allInputsValid) return;

    if (customValidityCheck && !customValidityCheck(formState)) return;

    await submitMutation({
      variables: formState,
      onError: (err) => {
        if (errorTranslator) {
          setError(errorTranslator(err));
        } else {
          setError(err);
        }
      },
    });

    setFormState(initialState);
  };

  // Now we can create our formCreator HOC, which will wrap FormFields and create a form with all our functionality.
  const formCreator = (children: ReactNode) => (
    <StyledForm onSubmit={submitForm} ref={formRef}>
      <Error error={error} />
      <fieldset>
        {children}
        <div className="buttons">
          {cancelFunction != null && (
            <Button className="cancel" onClick={cancelFunction}>
              Cancel
            </Button>
          )}
          <Button type="submit" aria-disabled={!allInputsValid}>
            {submitButtonText == null ? 'Submit' : submitButtonText}
          </Button>
        </div>
      </fieldset>
    </StyledForm>
  );

  return [formState, handleFormUpdate, formCreator, manualFormUpdate];
};

export default useForm;
