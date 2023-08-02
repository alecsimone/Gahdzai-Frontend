import { ApolloError } from '@apollo/client';

const signUpErrorTranslator = (e: ApolloError) => {
  if (e.message.includes('Unique constraint failed on the fields: (`email`)')) {
    return {
      message:
        "An account already exists for that email. If you've forgotten your password, please try resetting it.",
    };
  }
  if (e.message.includes('Display Name must be at least 3 characters long')) {
    return {
      message: 'Your display name must be at least 3 characters long',
    };
  }
  return e;
};
export default signUpErrorTranslator;
