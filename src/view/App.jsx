import React, { useReducer } from "react";
import styled from "styled-components";
import GlobalStyle from "../style/globalStyle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import * as c from "../style/colors";

//-------Components-------//
import Login from "../view/Login/Login.jsx";
import SignUp from "../view/SignUp/SignUp.jsx";
import Dashbord from "../view/Dashbord/Dashboard.jsx";
import Credits from "../view/Credits/Credits.jsx";

function App() {
  const isLogged = useSelector(state => state.isLoggedReducer);

  return (
    <Router>
      <AppWrapper>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/credits" component={Credits} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard">
              {isLogged ? <Dashbord /> : <Login />}
            </Route>
          </Switch>
          <GlobalStyle />
        </Wrapper>
      </AppWrapper>
    </Router>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${c.bgApp};
`;

const Wrapper = styled.div`
  margin: auto;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  background: ${c.bgShyBlue};
  font-family: "Montserrat", sans-serif;
`;
