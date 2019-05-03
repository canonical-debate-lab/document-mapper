import { gql } from "apollo-server";

export default gql`
  type Error {
    code: Int
    message: String
  }
`;
