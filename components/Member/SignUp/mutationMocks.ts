import { GraphQLError } from "graphql";
import LOG_IN_MUTATION from "../LogIn/logInMutation";
import SIGN_UP_MUTATION from "./signUpMutation";

const validSignUpMock = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        displayName: "Example Name",
        email: "test@example.com",
        password: "123456789",
        confirmPassword: "123456789",
      },
    },
    result: {
      data: {
        createMember: {
          __typename: "Member",
          id: "123",
          displayName: "Alec",
          email: "test@example.com",
        },
      },
    },
  },
  {
    request: {
      query: LOG_IN_MUTATION,
      variables: {
        email: "test@example.com",
        password: "123456789",
      },
    },
    result: {
      data: {
        authenticateMemberWithPassword: {
          __typename: "MemberAuthenticationWithPasswordFailure",
          message: "Authentication failed.",
        },
      },
    },
  },
];
export { validSignUpMock };

const duplicateSignUpMock = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        displayName: "Example Name",
        email: "test@example.com",
        password: "123456789",
        confirmPassword: "123456789",
      },
    },
    result: {
      errors: [
        new GraphQLError("Unique constraint failed on the fields: (`email`)"),
      ],
    },
  },
];
export { duplicateSignUpMock };
