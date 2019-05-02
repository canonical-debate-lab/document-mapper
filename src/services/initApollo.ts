import { ApolloClient, InMemoryCache, ApolloLink } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

function create(initialState: any, { getToken }: any) {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: "same-origin"
  });

  const authMiddlewareLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError = {} as any }) => {
    if (graphQLErrors && graphQLErrors.filter(e => e).length > 0)
      graphQLErrors.map(({ message = "", status = 200 }) => {
        // TODO CHANGE TO CORRECT MESSAGES
        if (
          message === "Context creation failed: you must be logged in" ||
          message === "Context creation failed: invalid signature" ||
          message ===
            "Context creation failed: secret or public key must be provided" ||
          status === 401
        ) {
          console.warn(`You've attempted to access UNAUTHORIZED section`);
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }
      });

    if (networkError && networkError.statusCode === 401) {
      window.location.href = "/login";
    }
  });

  const link = ApolloLink.from([errorLink, authMiddlewareLink, httpLink]);

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: {}, options: { getToken: any; }) {
  return create(initialState, options);
}
