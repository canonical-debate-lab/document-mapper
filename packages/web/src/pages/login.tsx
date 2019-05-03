import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Label } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation } from "react-apollo-hooks";
import { LOGIN } from "../graphql/login";

import Logo from "../assets/images/logo.png";

export default function Login() {
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useMutation(LOGIN);

  return (
    <Content>
      <Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              //@ts-ignore
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              //@ts-ignore
              errors.email = "Email invalid";
            }

            if (!values.password) {
              //@ts-ignore
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true);
            login({
              variables: {
                ...values
              }
            });
            setSubmitting(false);
            setIsLoading(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Header>
                <HeaderBg />
                <HeaderWelcome>
                  <HeaderLogo src={Logo} />
                </HeaderWelcome>
              </Header>
              <ContentForm>
                {authError && <MessageError>{authError}</MessageError>}
                <Label
                  htmlFor={45}
                  size={500}
                  display="block"
                  marginBottom={3}
                  marginTop={15}
                >
                  Email
                </Label>
                <Input
                  height={45}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="example@gmail.com"
                  autoComplete={"off"}
                />
                <MessageError>
                  {errors.email && touched.email && errors.email}
                </MessageError>
                <br />
                <Label
                  htmlFor={45}
                  size={500}
                  display="block"
                  marginBottom={3}
                  marginTop={15}
                >
                  Password
                </Label>
                <Input
                  height={45}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="your password"
                  type="password"
                  autoComplete={"off"}
                />
                <MessageError>
                  {errors.password && touched.password && errors.password}
                </MessageError>
                {/* <LinkCustom to="forgotPassword">Forgot Password?</LinkCustom> */}
              </ContentForm>
              <Button type="submit" disabled={isSubmitting} loading={isLoading}>
                <LabelButton>{isLoading ? "LOGGING IN" : "LOGIN"}</LabelButton>
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.grayDark};
`;

const Box = styled.div`
  height: auto;
  width: 400px;
  border-radius: 6px;
  background: #fff;
  position: relative;
  transition-delay: 0.5s;
  box-shadow: ${props => ` 0 0 40px 4px ${props.theme.color.gray}`};
`;

const Header = styled.div`
  text-align: center;
  padding: 11px;
  height: 100px;
  color: ${props => props.theme.color.gray};
  position: relative;
  background: #fff;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderBg = styled.div`
  background: rgba(241, 241, 241, 0.8);
  position: absolute;
  height: 118px;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const HeaderWelcome = styled.div`
  font-size: 18px;
  position: relative;
`;

const HeaderLogo = styled.img`
  width: auto;
  height: 60px;
  display: inline-block;
  vertical-align: middle;
  -webkit-transition: margin-top 0.4s;
  transition: margin-top 0.4s;
  margin: 10px 0px 0px 0px;
`;

const ContentForm = styled.div`
  padding: 40px;
`;

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  color: ${props => props.theme.color.red};
  font-size: 0.9em;
`;

const Input = styled.input`
  padding: 0 14px;
  font-size: 1em;
  right: 0;
  height: 45px;
  width: 88%;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 3px;
  border: 1px solid #f1f1f1;
  background: #f1f1f1;
`;

const Button = styled.button`
  background-color: ${props => props.theme.color.purpleLight};
  border: 0;
  padding: 14px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.2s ease-in-out;
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  opacity: ${props => (props.loading ? 0.8 : 1)};
`;

const LabelButton = styled.span`
  height: 42px;
  line-height: 42px;
  font-size: 1.5em;
  font-weight: bold;
`;

const LinkCustom = styled(Link)`
  height: 30px;
  width: 39%;
  line-height: 30px;
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  float: right;
  color: #333;
  :hover {
    text-decoration: underline;
  }
`;
