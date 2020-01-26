import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { flexbox } from "../../style/mixins";
import * as c from "../../style/colors";
import { AiOutlineExport, AiOutlinePoweroff } from "react-icons/ai";
import { GiClick, GiAstronautHelmet } from "react-icons/gi";
import { GoDeviceMobile, GoDeviceDesktop } from "react-icons/go";
import { FaHamburger } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

//-------Components-------//
import Todo from "./Todo/Todo";
import InProgress from "./InProgress/InProgress";
import Done from "./Done/Done";
import TaskCreation from "./TaskCreation/TaskCreation";
import SearchComponent from "./SearchComponent";
import ExcelButton from "./ExcelButton";

//-------Actions--------//
import { getUserAction } from "../../state/actions/getUserAction";
import { isLoggedAction } from "../../state/actions/isLoggedAction";
import { updateArraysAction } from "../../state/actions/updateArraysAction";
import {
  toggleDesktopAction,
  toggleMobileAction
} from "../../state/actions/toggleViewAction";
import { filteringArraysAction } from "../../state/actions/filteredTasksAction";
import { searchWindowAction } from "../../state/actions/searchWindowAction";

const Dashbord = () => {
  // const [desktopView, setDesktopView] = useState(true);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);

  const desktopView = useSelector(state => state.toggleViewReducer);
  const currentTab = useSelector(state => state.markTabReducer);
  const isLogged = useSelector(state => state.isLoggedReducer);
  const loggedUser = useSelector(state => state.userReducer[0]);
  const searchIsOpen = useSelector(state => state.searchWindowReducer);

  const dispatch = useDispatch();

  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch(getUserAction({}));
    dispatch(isLoggedAction({}));
  };

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
        console.log(e.target.id);
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

        <HeadContainer>
          <Logo onClick={() => setDropDownIsOpen(!dropDownIsOpen)}>
            <LogoImg avatarImg={loggedUser.avatar}>
              <MenuIndicator dropDownIsOpen={dropDownIsOpen}>
                <MenuIcon />
              </MenuIndicator>
            </LogoImg>
            <DropDownMenu dropDownIsOpen={dropDownIsOpen}>
              <WelcomeNote>{`Hi, ${loggedUser.userName}`}</WelcomeNote>
              <CreditsButton onClick={() => history.push("/credits")}>
                Credits <GiAstronautHelmet />
              </CreditsButton>

              <ExcelButton />

              <LogOutButton onClick={signOut}>
                Log Out <AiOutlinePoweroff />
              </LogOutButton>
            </DropDownMenu>
          </Logo>
          <Header>
            Dead<span>l</span>ine
          </Header>
          <ToggleView>
            <DesktopView
              onClick={() => dispatch(toggleDesktopAction())}
              desktopView={desktopView}
            >
              <GoDeviceDesktop />
            </DesktopView>
            <MobileView
              onClick={() => dispatch(toggleMobileAction())}
              desktopView={desktopView}
            >
              <GoDeviceMobile />
            </MobileView>
          </ToggleView>
          <SearchBox>
            <SearchButton
              onClick={() => dispatch(searchWindowAction(!searchIsOpen))}
            >
              {searchIsOpen ? <MdClose /> : <FiSearch />}
            </SearchButton>
          </SearchBox>
        </HeadContainer>
        {searchIsOpen && <SearchComponent />}
        <BodyContainer desktopView={desktopView}>
          <TabsContainer>
            <TodoTab
              href="#todo"
              currentTab={currentTab}
              desktopView={desktopView}
            >
              To Do
            </TodoTab>
            <InProgressTab
              href="#progress"
              currentTab={currentTab}
              desktopView={desktopView}
            >
              In Progress
            </InProgressTab>
            <DoneTab
              href="#done"
              currentTab={currentTab}
              desktopView={desktopView}
            >
              Done
            </DoneTab>
          </TabsContainer>

          <TrackersContainer>
            <PageCarousel>
              <Todo />
              <InProgress />
              <Done />
            </PageCarousel>
            <AddDeadlineButton onClick={() => setPopupIsOpen(true)}>
              +<span>l</span>
            </AddDeadlineButton>
          </TrackersContainer>
        </BodyContainer>
      </AppContainer>
    </Wrapper>
  );
};

export default Dashbord;

const Wrapper = styled.div`
  ${flexbox()};
  height: 100%;
  width: 100%;
`;

const AppContainer = styled.div`
  ${flexbox({ dir: "column", jc: "flex-start" })};
  flex-basis: 100%;
  width: 100%;
  height: 100%;
  max-width: 500px;
  position: relative;

  /* @media (min-width: 769px) {
    max-width: ${({ desktopView }) => (desktopView ? "1200px" : "500px")};
  } */

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

const HeadContainer = styled.div`
  ${flexbox({ jc: "space-around" })};
  height: 70px;
  width: 100%;
`;

const Logo = styled.div`
  text-align: center;
  flex-basis: 20%;
  position: relative;

  @media (min-width: 769px) {
    padding-left: 38px;
  }
`;

const LogoImg = styled.div`
  ${flexbox()};
  box-shadow: -3px -3px 7px 0 rgba(242, 248, 250, 0.9),
    2px 2px 6px 0 rgba(54, 73, 79, 0.25);
  border: 1px solid rgba(242, 248, 250, 0.2);
  opacity: 1;
  height: 45px;
  width: 45px;
  margin-left: 2px;
  border-radius: 50%;
  background: ${({ avatarImg }) => `url(${avatarImg})`};
  background-position: center;
  background-size: cover;
  position: relative;

  :hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const MenuIcon = styled(FaHamburger)`
  font-size: 14px;
`;

const MenuIndicator = styled.div`
  ${flexbox()};
  position: absolute;
  z-index: 3;
  right: -6px;
  bottom: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;

  :hover {
    cursor: pointer;
  }
`;

const DropDownMenu = styled.div`
  ${flexbox({ dir: "column" })}
  position: absolute;
  margin-top: 11px;
  z-index: 9;
  display: ${({ dropDownIsOpen }) => (dropDownIsOpen ? "block" : "none")};
  height: 200px;
  width: 200px;
  border: 3px solid ${c.bgSlateBlue};
  border-radius: 2%;

  :after {
    content: "";
    position: absolute;
    top: -11px;
    left: 14px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${c.bgSlateBlue};
  }
`;

const WelcomeNote = styled.div`
  ${flexbox()}
  flex-basis: 25%;
  height: 25%;
  width: 100%;
  background: ${c.bgSlateBlue};
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
`;

const CreditsButton = styled(WelcomeNote)`
  background: white;
  color: ${c.darkBlueText};
  transition: 0.2s ease-out;

  :hover {
    background: ${c.bgfadeBlue};
    cursor: pointer;
  }
`;

const LogOutButton = styled(CreditsButton)`
  color: crimson;
`;

const ToggleView = styled.div`
  display: block;
  ${flexbox()};
  flex-basis: 10%;
  min-width: 100px;

  background: ${c.elmShyBlue};
  border-radius: 5px;

  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);

  :hover {
    cursor: pointer;
  }

  @media (max-width: 769px) {
    display: none;
  }
`;

const DesktopView = styled.div`
  ${flexbox()};
  font-size: 1.3rem;
  border-radius: 5px 0 0 5px;
  height: 45px;
  width: 50%;
  flex-basis: 50%;

  transition: 0.1s ease-out;
  background: ${({ desktopView }) => (desktopView ? "#ced9db" : "#d8e7eb")};
  box-shadow: ${({ desktopView }) =>
    desktopView
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"};

  :hover {
    filter: brightness(1.1);
  }
`;

const MobileView = styled(DesktopView)`
  border-radius: 0 5px 5px 0;

  background: ${({ desktopView }) => (desktopView ? "#d8e7eb" : "#ced9db")};

  box-shadow: ${({ desktopView }) =>
    desktopView
      ? "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"};
`;

const SearchBox = styled.div`
  flex-basis: 10%;
  ${flexbox()};
`;

const SearchButton = styled.div`
  ${flexbox()}
  text-align: center;
  font-size: 1.4rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${c.elmShyBlue};
  box-shadow: -2px -2px 6px 0 rgba(242, 248, 250, 0.9),
    2px 2px 6px 0 rgba(54, 73, 79, 0.5);
  border: 1px solid rgba(242, 248, 250, 0.6);

  :hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const Header = styled.h1`
  color: ${c.darkBlueText};
  flex-basis: 60%;
  font-size: 2rem;
  text-align: center;
  font-family: "Titillium Web", sans-serif;
  span {
    color: red;
  }
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  @media (min-width: 769px) {
    max-width: ${({ desktopView }) => (desktopView ? "1200px" : "500px")};
  }
`;

const TabsContainer = styled.div`
  ${flexbox({ jc: "space-evenly" })};
  width: 100%;
  height: 6%;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 7;
  font-weight: bold;
  font-size: 1.1rem;
`;

const TodoTab = styled.a`
  ${flexbox()};
  flex-basis: 33%;
  height: 100%;
  border-radius: 15px 15px 0 0;
  color: black;
  transition: 0.2s ease-out;
  text-decoration: none;
  opacity: ${({ currentTab }) =>
    currentTab === "currentTabTodo" ? "1" : "0.5"};

  @media (min-width: 769px) {
    opacity: ${({ desktopView, currentTab }) =>
      !desktopView && currentTab === "currentTabTodo" ? "1" : "0.5"};

    :hover {
      cursor: ${({ desktopView }) =>
        desktopView ? "context-menu" : "pointer"};
    }
  }
`;

const InProgressTab = styled(TodoTab)`
  opacity: ${({ currentTab }) =>
    currentTab === "currentTabProgress" ? "1" : "0.5"};

  @media (min-width: 769px) {
    opacity: ${({ desktopView, currentTab }) =>
      !desktopView && currentTab === "currentTabProgress" ? "1" : "0.5"};
  }
`;

const DoneTab = styled(TodoTab)`
  opacity: ${({ currentTab }) =>
    currentTab === "currentTabDone" ? "1" : "0.5"};

  @media (min-width: 769px) {
    opacity: ${({ desktopView, currentTab }) =>
      !desktopView && currentTab === "currentTabDone" ? "1" : "0.5"};
  }
`;

const TrackersContainer = styled.div`
  position: relative;
  height: 94%;
  width: 100%;
`;

const PageCarousel = styled.div`
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`;

const AddDeadlineButton = styled.div`
  ${flexbox()};
  font-size: 1rem;
  position: absolute;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  font-family: "Titillium Web", sans-serif;

  border: 1px solid rgba(242, 248, 250, 0.2);
  box-shadow: -2px -2px 4px 0 rgba(242, 248, 250, 0.5),
    2px 2px 4px 0 rgba(54, 73, 79, 0.25);
  background: ${c.lightBlue};

  transition: 0.3s ease-out;
  opacity: 0.9;

  span {
    color: red;
    font-size: 2rem;
  }

  :hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
`;
