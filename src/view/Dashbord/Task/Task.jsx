import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

//---IMPORT COMPONENTS---//
import FaceSide from "./FaceSide/FaceSide";
import BackSide from "./BackSide/BackSide";

const Task = ({
  id,
  title,
  deadlineISO,
  description,
  twoDefaults,
  dateAndTimeSum,
  colorway,
  urgency,
  status
}) => {
  const [cardIsFlipped, setCardIsFlipped] = useState(false);

  const searchIsOpen = useSelector(state => state.searchWindowReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);

  let urgencyShadow = ``;

  const selectUrgency = (() => {
    switch (urgency) {
      case "high":
        urgencyShadow = `-2px -2px 10px 0 rgba(255, 84, 90, 0.7),
        2px 2px 6px 0 rgba(242, 248, 250, 0.5)`;
        break;
      case "regular":
        urgencyShadow = `-2px -2px 6px 0 rgba(84, 127, 255, 0.7),
        2px 2px 6px 0 rgba(242, 248, 250, 0.5)`;
        break;
      case "low":
        urgencyShadow = `-2px -2px 6px 0 rgba(54, 73, 79, 0.5),
        2px 2px 6px 0 rgba(242, 248, 250, 0.5)`;
        break;

      default:
        urgencyShadow = `-2px -2px 6px 0 rgba(54, 73, 79, 0.5),
      2px 2px 6px 0 rgba(242, 248, 250, 0.5)`;
        break;
    }
  })();

  let colorwayStyle = ``;

  const selectColorway = (() => {
    switch (colorway) {
      case "black":
        colorwayStyle = c.taskBlack;
        break;
      case "blue":
        colorwayStyle = c.taskBlue;
        break;
      case "turquoise":
        colorwayStyle = c.taskTurquoise;
        break;
      case "green":
        colorwayStyle = c.taskGreen;
        break;
      case "pink":
        colorwayStyle = c.taskPink;
        break;

      default:
        colorwayStyle = c.taskBlack;
        break;
    }
  })();

  //---TIME AND DATE PROPS--//
  const deadline = String(new Date(deadlineISO));
  const deadlineArray = deadline.split(" ");
  const dayText = deadlineArray[0];
  const monthText = deadlineArray[1];
  const dayNumber = deadlineArray[2];
  const year = deadlineArray[3];
  const time = deadlineArray[4].slice(0, 5);

  return (
    <TaskContainer
      cardIsFlipped={cardIsFlipped}
      urgencyShadow={urgencyShadow}
      searchIsOpen={searchIsOpen}
      desktopView={desktopView}
    >
      <FaceSide
        cardIsFlipped={cardIsFlipped}
        setCardIsFlipped={setCardIsFlipped}
        colorwayStyle={colorwayStyle}
        title={title}
        description={description}
        urgency={urgency}
        status={status}
        dayText={dayText}
        monthText={monthText}
        dayNumber={dayNumber}
        time={time}
        year={year}
        searchIsOpen={searchIsOpen}
        dateAndTimeSum={dateAndTimeSum}
      />
      <BackSide
        title={title}
        urgency={urgency}
        cardIsFlipped={cardIsFlipped}
        setCardIsFlipped={setCardIsFlipped}
        colorwayStyle={colorwayStyle}
        id={id}
        searchIsOpen={searchIsOpen}
        status={status}
      />
    </TaskContainer>
  );
};

export default Task;

const TaskContainer = styled.div`
  position: relative;
  ${flexbox()}
  flex-basis: 100%;
  width: 100%;
  max-width: 500px;
  height: 32%;
  max-height: 250px;
  min-height: 200px;
  margin: 10px 0;
  border-radius: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: ${({ urgencyShadow }) => urgencyShadow};

  transition: transform 0.8s;
  transform-style: preserve-3d;

  transform: ${({ cardIsFlipped }) =>
    cardIsFlipped
      ? "perspective(2000) rotateY(180deg)"
      : "perspective(2000) rotateY(0deg)"};

  @media (min-width: 769px) {
    flex-basis: ${({ searchIsOpen, desktopView }) =>
      searchIsOpen && desktopView ? "30%" : "100%"};
    width: ${({ searchIsOpen, desktopView }) =>
      searchIsOpen && desktopView ? "30%" : "100%"};
    margin: ${({ searchIsOpen, desktopView }) =>
      searchIsOpen && desktopView ? "10px 10px" : "10px 0"};
  }
`;
