interface LogInFormStateInterface {
  email: string;
  password: string;
}
export type { LogInFormStateInterface };

interface LogInResult {
  authenticateMemberWithPassword: {
    __typename:
      | 'MemberAuthenticationWithPasswordFailure'
      | 'MemberAuthenticationWithPasswordSuccess';
  };
}
export type { LogInResult };
