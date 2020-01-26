import React from "react";
import styled from "styled-components";
import Task from "./Task/Task";
import { flexbox } from "../../style/mixins";
import { useSelector } from "react-redux";

const TasksLister = ({ arrayToMap }) => {
  const toggleSort = useSelector(state => state.toggleSortReducer);

  if (toggleSort) {
    //<--IF (toggleSort === true) THE TASKS SORTED BY DEADLINE-->//
    const compare = (currentTask, nextTask) => {
      const timeCurrent = currentTask.dateAndTimeSum;
      const timeNext = nextTask.dateAndTimeSum;

      let comparison = 0;
      if (timeCurrent > timeNext) {
        comparison = 1;
      } else if (timeCurrent < timeNext) {
        comparison = -1;
      }
      return comparison;
    };

    arrayToMap.sort(compare);
  } else {
    const compare = (a, b) => {
      const urgencyNumberA = () => {
        switch (a.urgency) {
          case "low":
            return 0;
            break;
          case "regular":
            return 1;
            break;
          case "high":
            return 2;
            break;
          default:
            break;
        }
      };

      const urgencyNumberB = () => {
        switch (b.urgency) {
          case "low":
            return 0;
            break;
          case "regular":
            return 1;
            break;
          case "high":
            return 2;
            break;
          default:
            break;
        }
      };

      const urgencyA = urgencyNumberA();
      const urgencyB = urgencyNumberB();

      let comparison = 0;
      if (urgencyA < urgencyB) {
        comparison = 1;
      } else if (urgencyA > urgencyB) {
        comparison = -1;
      }
      return comparison;
    };

    arrayToMap.sort(compare);
    console.log("arrayToMapafterfalse", arrayToMap);
  }

  //<--IF (toggleSort === false) THE TASKS SORTED BY URGENCY-->//

  // <----------------------------->

  const tasksMap = () => {
    return arrayToMap.map((task, index) => {
      return (
        <Task
          id={task.id}
          key={index}
          deadlineISO={task.deadlineISO}
          dateAndTimeSum={task.dateAndTimeSum}
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          colorway={task.colorway}
          urgency={task.urgency}
          status={task.status}
        />
      );
    });
  };

  return <TasksList>{tasksMap()}</TasksList>;
};

export default TasksLister;

const TasksList = styled.div`
  ${flexbox({ jc: "flex-start", ai: "flex-start" })}
  align-content: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;
