interface logInFormStateInterface {
  email: string;
  password: string;
}
export type { logInFormStateInterface };

interface logInResult {
  authenticateMemberWithPassword: {
    __typename:
      | 'MemberAuthenticationWithPasswordFailure'
      | 'MemberAuthenticationWithPasswordSuccess';
  };
}
export type { logInResult };
