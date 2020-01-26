import React from "react";
import styled from "styled-components";
import { flexbox, borderShadowsRadius, buttonStyle } from "../../style/mixins";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as c from "../../style/colors";
import fetchAPI from "../../service/services";

import { getUserAction } from "../../state/actions/getUserAction";
import { isLoggedAction } from "../../state/actions/isLoggedAction";

const Login = () => {
  const isLogged = useSelector(state => state.isLoggedReducer);
  const dispatch = useDispatch();

  const LoggedUserToken = localStorage.getItem("token");

  if (LoggedUserToken) {
    // const getMethod = {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     "auth-token": localStorage.getItem("token")
    //   }
    // };

    const fetchLoggedUser = (async () => {
      // const userData = await fetch(
      //   `https://tracker-database.youngwebdevs.now.sh/login/loggeduser/`,
      //   getMethod
      // );
      // localStorage.setItem("token", userData.headers.get("auth-token"));
      // const jsonUserData = await userData.json();

      // const jsonUserData = fetchAPI({
      //   urlString: "logWithToken",
      //   method: "getToken"
      // });

      const jsonUserData = await fetchAPI({
        urlString: "logWithToken",
        method: "getByToken"
      });
      // localStorage.setItem("token", userData.headers.get("auth-token"));
      dispatch(getUserAction(jsonUserData));
      dispatch(isLoggedAction(jsonUserData));
    })();
  }

  const sendForm = async e => {
    e.preventDefault();
    const userName = e.target[0].value;
    const userPassword = e.target[1].value;

    try {
      // const userData = await fetch(
      //   `https://tracker-database.youngwebdevs.now.sh/login/userfromdb/?userName=${userName}&password=${userPassword}`
      // );
      // localStorage.setItem("token", userData.headers.get("auth-token"));
      // const jsonUserData = await userData.json();
      const jsonUserData = await fetchAPI({
        urlString: "logWithInput",
        method: "getByInput",
        userName,
        userPassword
      });

      // dispatch({ type: "IMPORTUSER", payload: jsonUserData });
      dispatch(getUserAction(jsonUserData));
      dispatch(isLoggedAction(jsonUserData));
    } catch (error) {
      alert(
        "Username or password is incorrect. make sure both user account and password are valid"
      );
    }
  };
  const loginAsGuest = async e => {
    e.preventDefault();
    const jsonUserData = await fetchAPI({
      urlString: "logWithInput",
      method: "getByInput",
      userName: "Global",
      userPassword: 1234
    });
    dispatch(getUserAction(jsonUserData));
    dispatch(isLoggedAction(jsonUserData));
  };

  return (
    <Wrapper>
      {isLogged === true && <Redirect push to="/dashboard" />}
      <Header>
        Dead<span>l</span>ine
      </Header>
      <Container>
        <FormBox onSubmit={sendForm}>
          <EmailInput type="text" minLength="2" placeholder="User Name..." />
          <PasswordInput
            type="password"
            minLength="4"
            placeholder="Password..."
          />
          <LoginButton type="submit">Log In</LoginButton>
          <SignUpButton>
            <StyledLink to="/signup">Sign Up</StyledLink>
          </SignUpButton>
          <GuestButton onClick={loginAsGuest}>Log as Global Guest</GuestButton>
        </FormBox>
      </Container>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  color: ${c.darkText};
`;

const Header = styled.div`
  flex-basis: 10%;
  font-size: 4rem;
  font-family: "Titillium Web", sans-serif;
  color: ${c.darkBlueText};
  span {
    color: red;
  }
`;

const Container = styled.div`
  ${flexbox()};
  ${borderShadowsRadius};
  flex-basis: 65%;
  width: 80%;

  background: ${c.bgShyBlue};
  padding: 20px;

  max-height: 375px;
  max-width: 400px;

  font-family: "Montserrat", sans-serif;
`;

const FormBox = styled.form`
  ${flexbox({ dir: "column", jc: "space-around" })};

  width: 90%;
  height: 100%;
`;

const EmailInput = styled.input`
  box-shadow: ${c.inputShadows};
  background: ${c.inputShyBlue};
  color: ${c.darkBlueText};
  width: 100%;
  height: 15%;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
  font-size: 0.8rem;

  opacity: 0.7;
  transition: 0.3s ease-out;

  outline: none;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;
const PasswordInput = styled(EmailInput)`
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  ${buttonStyle}

  background: ${c.elmShyBlue};
  color: ${c.darkBlueText};
  &:hover,
  &:focus {
    opacity: 0.9;
    cursor: pointer;
    background: ${c.elmLightBlue};
  }
`;

const SignUpButton = styled(LoginButton)``;
const GuestButton = styled(LoginButton)``;

const StyledLink = styled(Link)`
  ${flexbox()};
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;
