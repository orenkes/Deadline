import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

// Packages //
import { useSelector, useDispatch } from "react-redux";

// Actions //
import {
  toggleDeadlineAction,
  toggleUrgencyAction
} from "../../../state/actions/toggleSortAction";

// Add ons //
import { GiSandsOfTime } from "react-icons/gi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ToggleView = () => {
  const dispatch = useDispatch();
  const toggleSort = useSelector(state => state.toggleSortReducer);

  return (
    <ToggleSortBox>
      <ToggleDeadline
        onClick={() => dispatch(toggleDeadlineAction())}
        toggleSort={toggleSort}
      >
        <GiSandsOfTime />
      </ToggleDeadline>
      <ToggleUrgency
        onClick={() => dispatch(toggleUrgencyAction())}
        toggleSort={toggleSort}
      >
        <AiOutlineExclamationCircle />
      </ToggleUrgency>
    </ToggleSortBox>
  );
};

export default ToggleView;

const ToggleSortBox = styled.div`
  display: block;
  ${flexbox()};
  flex-basis: 10%;
  min-width: 60px;
  position: relative;
  z-index: 3;
  background: ${c.elmShyBlue};
  border-radius: 5px;

  box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
    3px 3px 6px 0 rgba(54, 73, 79, 0.25);

  :hover {
    cursor: pointer;
  }
`;

const ToggleDeadline = styled.div`
  ${flexbox()};
  font-size: 1.5rem;
  border-radius: 5px 0 0 5px;
  height: 45px;
  width: 50%;
  flex-basis: 50%;

  transition: 0.1s ease-out;
  background: ${({ toggleSort }) => (toggleSort ? "#ced9db" : "#d8e7eb")};
  box-shadow: ${({ toggleSort }) =>
    toggleSort
      ? "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"};

  :hover {
    filter: brightness(1.1);
  }
`;

const ToggleUrgency = styled(ToggleDeadline)`
  border-radius: 0 5px 5px 0;

  background: ${({ toggleSort }) => (toggleSort ? "#d8e7eb" : "#ced9db")};

  box-shadow: ${({ toggleSort }) =>
    toggleSort
      ? "2px 2px 4px -2px rgba(54, 73, 79, 1), -2px -2px 4px -2px rgba(242, 248, 250, 1)"
      : "inset 2px 2px 4px -2px rgba(54, 73, 79, 1), inset -2px -2px 4px -2px rgba(242, 248, 250, 1)"};
`;
