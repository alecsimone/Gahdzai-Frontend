import { logInResult } from '../LogIn/types';

const resetFailed =
  'Reset failed. Please check that you entered the correct email address, and make sure you came here through the link in your password reset email.';
export { resetFailed };

const expiredToken =
  'Your token has expired. Please begin the reset process again.';
export { expiredToken };

const redeemedToken =
  'That token has already been redeemed. Did you reset your password already?';
export { redeemedToken };

const didLoginWork = (logInData: logInResult) =>
  logInData?.authenticateMemberWithPassword?.__typename ===
  'MemberAuthenticationWithPasswordSuccess';
export { didLoginWork };
