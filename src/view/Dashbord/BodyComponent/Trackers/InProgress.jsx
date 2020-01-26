import React, { useEffect } from "react";
import styled from "styled-components";

import { flexbox } from "../../../../style/mixins";
import * as c from "../../../../style/colors";

import TasksLister from "../../TasksLister";

//-------- Redux --------//
import { markProgress } from "../../../../state/actions/markTabAction";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

const InProgress = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const tasksArrays = useSelector(state => state.updateArraysReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatchCurrentTab();
  }, [inView]);

  const dispatchCurrentTab = () => {
    if (inView) {
      dispatch(markProgress());
      console.log("progressview");
    }
  };

  return (
    <Wrapper id="progress" ref={ref} desktopView={desktopView}>
      <TasksLister arrayToMap={tasksArrays.inProgressArray} />
    </Wrapper>
  );
};

export default InProgress;

const Wrapper = styled.div`
  /* without vertical-align the inline-blocks moves down */
  vertical-align: top;
  scroll-snap-align: center;
  scroll-snap-stop: always;

  display: inline-block;
  width: 100%;
  height: 100%;

  background: ${c.gradientGreen};
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
