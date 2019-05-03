import { ApolloServer } from "apollo-server";
import logger from "./helper/logger";
import typeDefs from "./schema";
import resolvers from "./resolver";
import { getUser } from "./helper/util";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const data = getUser(req);
    return {
      user: data.user || {},
      token: data.token || ""
    };
  },
  formatError: error => {
    logger.warn(error);
    return error;
  },
  formatResponse: (response, query) => {
    const key = response.data ? Object.keys(response.data) : "none";
    logger.info("GraphQL query name and user", {
      query: key,
      userId: query.context.user.user
    });
    return response;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
