import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../../style/mixins";
import * as c from "../../../../style/colors";

import { GiTimeBomb } from "react-icons/gi";

import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

const Tabs = ({ setPopupIsOpen }) => {
  return (
    <TrackersContainer>
      <PageCarousel>
        <Todo />
        <InProgress />
        <Done />
      </PageCarousel>
      <AddDeadlineButton onClick={() => setPopupIsOpen(true)}>
        <GiTimeBomb />
      </AddDeadlineButton>
    </TrackersContainer>
  );
};

export default Tabs;

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
  font-size: 2.2rem;
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
  background: ${c.bgLightBlue};

  transition: 0.3s ease-out;
  opacity: 0.9;

  :hover {
    filter: brightness(1.15);
    cursor: pointer;
  }
`;
