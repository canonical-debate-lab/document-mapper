import React, { Fragment } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import get from "lodash.get";
import { useAuth } from "../hooks/useAuth";

export const Layout = (props: {
  routes: Array<Object>;
  children: React.ReactNode;
}) => {
  const { auth } = useAuth();
  const isAuth = !!get(auth, "token", false) && !window.location.pathname.includes("login")
  return isAuth ? (
    <Fragment>
      <Grid>
        <GridHeader>
          <Navbar routes={props.routes} />
        </GridHeader>
        <GridContent>{props.children}</GridContent>
      </Grid>
    </Fragment>
  ) : (
    <Fragment>{props.children}</Fragment>
  );
};

const Grid = styled.div`
  height: 100vh;
  overflow: none;
`;

const GridHeader = styled.div`
  display: grid;
`;

const GridContent = styled.div`
  overflow: auto;
  grid-area: content;
  padding: 0 3.5em;
  max-width: 1280px;
  margin: 2em auto;
`;
