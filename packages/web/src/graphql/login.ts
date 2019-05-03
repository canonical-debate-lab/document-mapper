import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;
