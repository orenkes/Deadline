import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { flexbox } from "../../../../style/mixins";
import * as c from "../../../../style/colors";

//-------- Redux --------//
import { markTodo } from "../../../../state/actions/markTabAction";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import TasksLister from "../../TasksLister";

const Todo = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  const dispatch = useDispatch();
  const tasksArrays = useSelector(state => state.updateArraysReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);

  useEffect(() => {
    dispatchCurrentTab();
  }, [inView, desktopView]);

  const dispatchCurrentTab = () => {
    if (inView) {
      dispatch(markTodo());
      console.log("todoview");
    }
  };

  return (
    <Wrapper id="todo" ref={ref} desktopView={desktopView}>
      <TasksLister arrayToMap={tasksArrays.todoArray} />
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  vertical-align: top;
  ${flexbox()};
  scroll-snap-align: center;
  scroll-snap-stop: always;
  display: inline-block;
  width: 100%;
  height: 100%;

  background: ${c.gradientBlue};
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
