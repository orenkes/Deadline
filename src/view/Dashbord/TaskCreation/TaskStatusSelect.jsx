import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

const TaskStatusSelect = ({ status, setStatus }) => {
  return (
    <TaskStatusSelectBox>
      <TodoOption onClick={() => setStatus("To Do")} status={status}>
        To Do
      </TodoOption>
      <InProgressOption
        onClick={() => setStatus("In Progress")}
        status={status}
      >
        In Progress
      </InProgressOption>
      <DoneOption onClick={() => setStatus("Done")} status={status}>
        Done
      </DoneOption>
    </TaskStatusSelectBox>
  );
};

export default TaskStatusSelect;

const TaskStatusSelectBox = styled.div`
  ${flexbox()}
  width: 60%;
  min-width: 250px;
  height: 50px;
  border-radius: 5px;
  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);

  font-size: 0.8rem;
`;

const StatusOptionStyle = `
  ${flexbox()}
  flex-basis: 33.333%;
  height: 50px;
  background: ${c.elmShyBlue};

  :hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const TodoOption = styled.div`
  ${StatusOptionStyle}

  box-shadow: ${({ status }) =>
    status === "To Do"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

  border-radius: 5px 0 0 5px;
`;

const InProgressOption = styled.div`
  ${StatusOptionStyle}

  box-shadow: ${({ status }) =>
    status === "In Progress"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

      position: relative;
`;
const DoneOption = styled.div`
  ${StatusOptionStyle}

  box-shadow: ${({ status }) =>
    status === "Done"
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 0.50), inset -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 0.50), -2px -2px 4px -2px rgba(242, 248, 250, 0.50)"};

  border-radius: 0 5px 5px 0;
`;
