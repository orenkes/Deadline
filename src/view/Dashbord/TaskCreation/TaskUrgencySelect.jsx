import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

const TaskUrgencySelect = ({ urgency, setUrgency }) => {
  return (
    <TaskUrgencySelectBox>
      <LowUrgency onClick={() => setUrgency("low")} urgency={urgency}>
        Regular
      </LowUrgency>
      <RegularUrgency onClick={() => setUrgency("regular")} urgency={urgency}>
        Important
      </RegularUrgency>
      <HighUrgency onClick={() => setUrgency("high")} urgency={urgency}>
        Urgent!
      </HighUrgency>
    </TaskUrgencySelectBox>
  );
};

export default TaskUrgencySelect;

const TaskUrgencySelectBox = styled.div`
  ${flexbox()}
  width: 60%;
  min-width: 250px;
  height: 50px;
  border-radius: 5px;
  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);

  font-size: 0.9rem;
`;

const UrgencyOptionStyle = `
  ${flexbox()}
  flex-basis: 33.333%;
  height: 50px;
  background: ${c.elmShyBlue};

  :hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const LowUrgency = styled.div`
  ${UrgencyOptionStyle}

  box-shadow: ${({ urgency }) =>
    urgency === "low"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

  border-radius: 5px 0 0 5px;
`;

const RegularUrgency = styled.div`
  ${UrgencyOptionStyle}

  box-shadow: ${({ urgency }) =>
    urgency === "regular"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

      position: relative;
`;
const HighUrgency = styled.div`
  ${UrgencyOptionStyle}

  box-shadow: ${({ urgency }) =>
    urgency === "high"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

  border-radius: 0 5px 5px 0;
`;
