import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

export function Home() {
  return (
    <Fragment>
      <Content />
    </Fragment>
  );
}

const Content = styled.div`
  margin: 0 auto;
  padding-bottom: 50px;
`;

export default withRouter(Home);
