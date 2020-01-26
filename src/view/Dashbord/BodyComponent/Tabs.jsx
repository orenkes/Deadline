import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

// Packages //
import { useSelector } from "react-redux";

const Tabs = () => {
  const currentTab = useSelector(state => state.markTabReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);

  return (
    <TabsContainer>
      <TodoTab href="#todo" currentTab={currentTab} desktopView={desktopView}>
        To Do
      </TodoTab>
      <InProgressTab
        href="#progress"
        currentTab={currentTab}
        desktopView={desktopView}
      >
        In Progress
      </InProgressTab>
      <DoneTab href="#done" currentTab={currentTab} desktopView={desktopView}>
        Done
      </DoneTab>
    </TabsContainer>
  );
};

export default Tabs;

const TabsContainer = styled.div`
  ${flexbox({ jc: "space-evenly" })};
  width: 100%;
  height: 6%;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 7;
  font-weight: bold;
  font-size: 1.1rem;
  background: ${c.shyBlue};
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
