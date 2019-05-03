import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { createBrowserHistory } from "history";
import { ApolloProvider } from "react-apollo";
import { GlobalStyle } from "./configureStyle";
import get from "lodash.get";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import initApollo from "./services/initApollo";
import { isAuth } from "./utils/helper";
import { theme } from "./theme";
import Routes from "./routes/index";

const auth = isAuth();
const apolloClient = initApollo(
  {},
  {
    getToken: () => get(auth, "token", "")
  }
);

const bh = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <Router history={bh}>
          <GlobalStyle />
          <Routes />
        </Router>
      </ApolloHooksProvider>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "production") {
  //@ts-ignore
  if (module.hot) {
    //@ts-ignore
    module.hot.accept();
  }
}
