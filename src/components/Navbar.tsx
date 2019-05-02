import React, { useEffect, useState } from "react";
import get from "lodash/get";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { withRouter } from 'react-router-dom';
import LogoIcon from "../assets/images/logo.png";

const Navbar = props => {
  const { auth } = useAuth();
  const isAuth = !!get(auth, "token", false)

  const logout = () => {
    console.log('logout')
  }

  return isAuth ? (
    <Content>
      <ContentBox>
        <Header>
        <HeaderBoxImg>
          <img src={LogoIcon} alt="Document Mapper" />
        </HeaderBoxImg>
        </Header>
        <ContentLink>
          {props.routes.map((route, key) => (
            <ContextBoxItem key={key} onClick={() => props.history.push(route.path)}>
              <ContextBoxItemLabel>
                <span>
                  {route.name}
                </span>
              </ContextBoxItemLabel>
            </ContextBoxItem>
          ))}
        </ContentLink>
          <BoxLogout>
            <Logout onClick={this.logout}><span>Logout</span></Logout>
          </BoxLogout>
      </ContentBox>
    </Content>
  ) : null;
};

export default withRouter(Navbar);

const Content = styled.div`
  background-color: #1070ca;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
`
const ContentBox = styled.div`
  height: 100%;  
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  padding: 0 3.5em;
  justify-content: center;

  > :last-child {
    margin-left: auto;
    padding-right: 20px;
  }
`
const ContextBoxItem = styled.a`
  &:first-child {
    margin-left: 1.8em;
  }
`
const ContextBoxItemLabel = styled.div`
  cursor: pointer;
  color: #FFFFFF;
  padding-right: 22px;
  font-size: 1em;

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color .3s ease-in-out;
  }
`
const BoxLogout = styled.div``
const Logout = styled.a`
  cursor: pointer; 
  color: #FFFFFF;
  font-size: 1em;

  > span:hover {
    border-bottom: 1px solid #fff;
    padding-bottom: 4px;
    transition: border-bottom-color .3s ease-in-out;
  }
`;

const Header = styled.div``
const HeaderBoxImg = styled.div`
  padding-right: 20px;
  > img {
    height: 45px;
    width: auto;
    border-radius: 5px;
  }
`

const ContentLink = styled.div`
  display: flex;
  justify-content: space-between;
`