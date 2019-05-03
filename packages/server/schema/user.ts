import { gql } from "apollo-server";

export default gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signin(username: String!, password: String!): AuthToken
  }

  type AuthToken {
    token: String
  }

  type User {
    id: Int
    email: String
    name: String
    img: String
    username: String
  }
`;
