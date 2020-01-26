import React, { useEffect } from "react";
import styled from "styled-components";

import * as c from "../../../../style/colors";

import TasksLister from "../../TasksLister";

//-------- Redux --------//
import { markDone } from "../../../../state/actions/markTabAction";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

const Done = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const tasksArrays = useSelector(state => state.updateArraysReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatchCurrentTab();
  }, [inView]);

  const dispatchCurrentTab = () => {
    if (inView) {
      dispatch(markDone());
      console.log("doneview");
    }
  };

  return (
    <Wrapper id="done" ref={ref} desktopView={desktopView}>
      <TasksLister arrayToMap={tasksArrays.completedTasksArray} />
    </Wrapper>
  );
};

export default Done;

const Wrapper = styled.div`
  vertical-align: top;
  scroll-snap-align: center;
  scroll-snap-stop: always;

  display: inline-block;
  width: 100%;
  height: 100%;

  background: ${c.gradientRed};
  box-shadow: inset 2px 2px 6px rgba(54, 73, 79, 0.15),
    inset -2px -2px 8px rgba(242, 248, 250, 0.2);

  @media (min-width: 769px) {
    width: ${({ desktopView }) => (desktopView ? "33.333%" : "100%")};
  }
`;

// const TasksList = styled.div`
//   /* ${flexbox({ dir: "column", jc: "flex-start" })}; */
//   height: 100%;
//   width: 100%;
//   overflow-y: auto;
// `;
