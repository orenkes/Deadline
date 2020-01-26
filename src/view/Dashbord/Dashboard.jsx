import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { flexbox } from "../../style/mixins";
import * as c from "../../style/colors";

//-------Components-------//
// import Todo from "./Todo/Todo";
// import InProgress from "./InProgress/InProgress";
// import Done from "./Done/Done";
import TaskCreation from "./TaskCreation/TaskCreation";
import SearchComponent from "./SearchComponent/SearchComponent";
import HeadComponent from "./HeadComponent/HeadComponent";
import BodyComponent from "./BodyComponent/BodyComponent";

//-------Actions--------//
import { updateArraysAction } from "../../state/actions/updateArraysAction";

const Dashbord = () => {
  // const [desktopView, setDesktopView] = useState(true);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const desktopView = useSelector(state => state.toggleViewReducer);
  const isLogged = useSelector(state => state.isLoggedReducer);
  const loggedUser = useSelector(state => state.userReducer[0]);
  const searchIsOpen = useSelector(state => state.searchWindowReducer);

  const dispatch = useDispatch();

  const oneTime = (() => {
    if (flag) {
      dispatch(
        updateArraysAction({
          tasksCounter: loggedUser.tasksCounter,
          todoArray: loggedUser.todoArray,
          inProgressArray: loggedUser.inProgressArray,
          completedTasksArray: loggedUser.completedTasksArray
        })
      );
      setFlag(false);
    }
  })();

  return (
    <Wrapper
      id="dashWrapper"
      onClick={e => {
        dropDownIsOpen && setDropDownIsOpen(false);
      }}
    >
      {isLogged === false && <Redirect push to="/" />}
      <AppContainer desktopView={desktopView}>
        <TaskCreationWrapper popupIsOpen={popupIsOpen}>
          <TaskCreationContainer
            id="taskContainer"
            onClick={e => {
              e.target.id === "taskContainer" && setPopupIsOpen(false);
            }}
          >
            <TaskCreation setPopupIsOpen={setPopupIsOpen} />
          </TaskCreationContainer>
        </TaskCreationWrapper>

        <HeadComponent
          dropDownIsOpen={dropDownIsOpen}
          setDropDownIsOpen={setDropDownIsOpen}
        />

        {searchIsOpen && <SearchComponent />}

        <BodyComponent setPopupIsOpen={setPopupIsOpen} />
      </AppContainer>
    </Wrapper>
  );
};

export default Dashbord;

const Wrapper = styled.div`
  ${flexbox()};
  height: 100%;
  width: 100%;
  background: ${c.bgApp};
`;

const AppContainer = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  flex-basis: 100%;
  width: 100%;
  height: 100%;
  max-width: 500px;
  position: relative;

  @media (min-width: 769px) {
    max-width: 1200px;
  }
`;

const TaskCreationWrapper = styled.div`
  ${flexbox()}
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  background: ${c.shyBlue};
  transition: 0.2s ease-out;
  transform: ${({ popupIsOpen }) => (popupIsOpen ? "scale(1)" : "scale(0)")};
`;

const TaskCreationContainer = styled.div`
  ${flexbox()};
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
`;
