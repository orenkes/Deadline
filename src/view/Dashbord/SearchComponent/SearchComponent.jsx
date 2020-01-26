import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";
import { useDispatch, useSelector } from "react-redux";

import { filteringArraysAction } from "../../../state/actions/filteredTasksAction";

import TasksLister from "../TasksLister";

const SearchScreen = () => {
  const dispatch = useDispatch();

  const searchIsOpen = useSelector(state => state.searchWindowReducer);
  const desktopView = useSelector(state => state.toggleViewReducer);
  const tasksArrays = useSelector(state => state.updateArraysReducer);
  const filteringArrays = useSelector(state => state.filteringArraysReducer);

  useEffect(() => {
    dispatch(
      filteringArraysAction([
        ...tasksArrays.todoArray,
        ...tasksArrays.inProgressArray,
        ...tasksArrays.completedTasksArray
      ])
    );
  }, [tasksArrays]);

  const getSearchInput = e => {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(
        filteringArraysAction([
          ...tasksArrays.todoArray,
          ...tasksArrays.inProgressArray,
          ...tasksArrays.completedTasksArray
        ])
      );
    } else {
      let searchInput = e.target.value;

      const allTasksArray = [
        ...tasksArrays.todoArray,
        ...tasksArrays.inProgressArray,
        ...tasksArrays.completedTasksArray
      ];

      const filteredTasks = allTasksArray.filter(task =>
        task.title.toUpperCase().includes(searchInput.toUpperCase())
      );

      dispatch(filteringArraysAction([...filteredTasks]));
    }
  };

  return (
    <SearchScreenBox searchIsOpen={searchIsOpen} desktopView={desktopView}>
      <SearchHeadSection>
        <SearchInput placeholder="Search Deadline" onChange={getSearchInput} />
      </SearchHeadSection>
      <TasksDisplay>
        <TasksLister arrayToMap={filteringArrays} />
      </TasksDisplay>
    </SearchScreenBox>
  );
};

export default SearchScreen;

const SearchScreenBox = styled.div`
  ${flexbox()};
  display: ${({ searchIsOpen }) => (searchIsOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  height: calc(100% - 70px);
  background: ${c.gradientCyan};
  position: absolute;
  bottom: 0;
  z-index: 8;

  @media (min-width: 769px) {
    max-width: ${({ desktopView }) => (desktopView ? "1200px" : "500px")};
  }
`;

const SearchHeadSection = styled.div`
  position: relative;
  ${flexbox()};
  height: 10%;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  letter-spacing: 3px;
  z-index: 3;
  box-shadow: 0 20px 20px -20px lightslategray;
`;

const SearchInput = styled.input`
  height: 100%;
  border: none;
  background: ${c.inputShyBlue};
  font-family: "Helvetica Neue", sans-serif;
  border-radius: 25px;
  padding-left: 15px;
  width: 80%;
  max-width: 400px;
  height: 50px;
  font-size: 1.1rem;
  outline: none;
  :focus {
    filter: brightness(1.1);
  }

  box-shadow: ${c.inputShadows};
`;

const TasksDisplay = styled.div`
  ${flexbox()};
  height: 90%;
  width: 100%;
  overflow-y: auto;
`;
